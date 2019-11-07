import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload, LoginByUsernameDto, LoginResponseDto } from '@pardjs/auth-service-common';
import { logger, superMd5 } from '@pardjs/common';
import { spanHours } from '@pardjs/common';
import { Repository } from 'typeorm';
import {
  IP_WHITE_LIST_USER_ID,
  LOGIN_SESSION_LIFE_HOURS,
  LOGIN_SESSION_LIFE_SECONDS,
  PASSWORD_HASH_KEY,
} from '../../constants';
import { Errors } from '../../errors';
import { BllError } from '../bll-error';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { LoginSession } from './login-session.entity';

@Injectable()
export class LoginSessionsService {
  constructor(
    @InjectRepository(LoginSession)
    private readonly loginSessionRepository: Repository<LoginSession>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  decodeToken(token: string): JwtPayload | BllError {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      // TODO: this error should in @pardjs/common
      return new BllError('JWT_DECODE_ERROR', { JWT_DECODE_ERROR: {
        type: 'JWT_DECODE_ERROR',
        message: {
          zh_CN: '解析JWT失败',
          en_US: 'decode jwt failed',
        },
      }});
    }
  }

  genToken(loginSessionId: number): string {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    const user: JwtPayload = { loginSessionId };
    return this.jwtService.sign(user, {
      expiresIn: LOGIN_SESSION_LIFE_SECONDS,
    });
  }

  async prolongSession(loginSessionId: number) {
    await this.loginSessionRepository.update(
      { id: loginSessionId },
      { updatedAt: new Date() },
    );
  }

  async validate(payload: JwtPayload): Promise<User> {
    const session = await this.loginSessionRepository.findOne(
      payload.loginSessionId,
    );
    if (!session) {
      return;
    }
    if (spanHours(session.updatedAt) > LOGIN_SESSION_LIFE_HOURS) {
      throw new ForbiddenException(Errors.LOGIN_SESSION_TIMEOUT);
    }
    const userId = session.userId;
    return this.usersService.findById(userId);
  }

  async loginByUsername(data: LoginByUsernameDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findOne({
      username: data.username,
      password: superMd5(data.password, PASSWORD_HASH_KEY),
    });
    if (!user) {
      throw new BadRequestException(Errors.INVALID_LOGIN_ID_OR_PASSWORD);
    }
    return await this.generateLoginResponse(user);
  }

  async loginByIp(): Promise<LoginResponseDto> {
    const user = await this.usersService.findOne({
      id: IP_WHITE_LIST_USER_ID,
    });
    if (!user) {
      throw new BadRequestException(Errors.INVALID_LOGIN_ID_OR_PASSWORD);
    }
    const res = await this.generateLoginResponse(user);
    logger.info('loginByIp', res);
    return res;
  }

  private async generateLoginResponse(user: User) {
    const userId = user.id;
    const newSession = this.loginSessionRepository.create({ userId: user.id });
    const savedSession = await this.loginSessionRepository.save(newSession);
    const sessionId = savedSession.id;
    const token = this.genToken(sessionId);
    return { userId, token, expiresIn: LOGIN_SESSION_LIFE_SECONDS };
  }

  async logout(user: User) {
    await this.loginSessionRepository.delete({ userId: user.id });
    return;
  }
}
