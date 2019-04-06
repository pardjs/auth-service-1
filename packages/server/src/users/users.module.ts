import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { JWT_SECRET, LOGIN_SESSION_LIFE_SECONDS } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LoginSession } from './login-session.entity';
import { LoginSessionsService } from './login-sessions.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, LoginSession]),
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
