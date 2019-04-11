import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthPoint } from '../auth-points/auth-point.entity';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { JWT_SECRET, LOGIN_SESSION_LIFE_SECONDS } from '../constants';
import { LoginSession } from '../login-session/login-session.entity';
import { LoginSessionsService } from '../login-session/login-sessions.service';
import { Role } from '../roles/role.entity';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, LoginSession, AuthPoint, Role]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: JWT_SECRET,
      signOptions: {
        expiresIn: LOGIN_SESSION_LIFE_SECONDS,
      },
    }),
  ],
  providers: [UsersService, AuthService, LoginSessionsService, JwtStrategy],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
