import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthModule } from '../auth';
import { AuthPointsModule } from '../auth-points';
import { RolesModule } from '../roles';
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
  controllers: [UsersController, LoginSessionsController],
})
export class WebServicesModule {}
