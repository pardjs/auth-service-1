import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { fromAnywhere } from '@pardjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from '../constants';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';

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
    req.user = user;
    if (!user) {
      throw new UnauthorizedException(
        'bearer token should be provided to access this api.',
      );
    }
    return user;
  }
}
