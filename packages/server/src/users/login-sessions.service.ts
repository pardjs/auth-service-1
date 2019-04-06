import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { superMd5 } from '@pardjs/common';
import { spanHours } from '@pardjs/common';
import { Repository } from 'typeorm';
import {
  LOGIN_SESSION_LIFE_HOURS,
  LOGIN_SESSION_LIFE_SECONDS,
  PASSWORD_HASH_KEY,
} from '../constants';
import { UserErrors } from './errors';
import { JwtPayload } from './jwt-payload.interface';
import { LoginByIdDto } from './login-by-id.dto';
import { LoginResponse } from './login-response.dto';
import { LoginSession } from './login-session.entity';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Injectable()
export class LoginSessionsService {
  constructor(
    @InjectRepository(LoginSession)
    private readonly loginSessionRepository: Repository<LoginSession>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

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
      throw new ForbiddenException(UserErrors.LOGIN_SESSION_TIMEOUT);
    }
    const userId = session.userId;
    return this.usersService.findById(userId);
  }

  async loginById(data: LoginByIdDto): Promise<LoginResponse> {
    const user = await this.usersService.findOne({
      employeeId: data.employeeId,
      password: superMd5(data.password, PASSWORD_HASH_KEY),
    });
    if (!user) {
      throw new BadRequestException(UserErrors.INVALID_LOGIN_ID_OR_PASSWORD);
    }
    return await this.generateLoginResponse(user);
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
