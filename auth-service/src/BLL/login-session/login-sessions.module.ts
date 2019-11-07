import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JWT_SECRET, LOGIN_SESSION_LIFE_SECONDS } from '../../constants';
import { UsersModule } from '../users/users.module';
import { LoginSession } from './login-session.entity';
import { LoginSessionsService } from './login-sessions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoginSession]),
    JwtModule.register({
      secretOrPrivateKey: JWT_SECRET,
      signOptions: {
        expiresIn: LOGIN_SESSION_LIFE_SECONDS,
      },
    }),
    UsersModule,
  ],
  providers: [LoginSessionsService],
  exports: [LoginSessionsService],
})
export class LoginSessionsModule {}
