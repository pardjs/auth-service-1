import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthModule } from '../auth';
import { AuthPointsModule } from '../auth-points';
import { RolesModule } from '../roles';
import { AuthPointController } from './auth-points.controller';
import { LoginSessionsController } from './login-sessions.controller';
import { UsersController } from './users.controller';

@Module({
  imports: [
    RolesModule,
    AuthPointsModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [],
  controllers: [UsersController, LoginSessionsController, AuthPointController],
})
export class WebServicesModule {}
