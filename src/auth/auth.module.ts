import { LoginSessionsModule } from './../login-session/login-sessions.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET, LOGIN_SESSION_LIFE_SECONDS } from './../constants';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: JWT_SECRET,
      signOptions: {
        expiresIn: LOGIN_SESSION_LIFE_SECONDS,
      },
    }),
    LoginSessionsModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
