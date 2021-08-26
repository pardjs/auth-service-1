import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '@pardjs/auth-service-common';
import { fromAnywhere, logger } from '@pardjs/common-1';
import { Strategy } from 'passport-jwt';
import { JWT_SECRET } from '../../constants';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: fromAnywhere(),
      secretOrKey: JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: JwtPayload) {
    const user = await this.authService.validateLoginSession(payload);
    logger.info('user found in JwtStrategy', { user });
    req.user = user;
    if (!user) {
      throw new UnauthorizedException(
        'bearer token should be provided to access this api.',
      );
    }
    return user;
  }
}
