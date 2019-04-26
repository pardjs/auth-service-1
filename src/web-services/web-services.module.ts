import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersApiService } from './users-api.service';

import { AuthModule } from '../auth';
import { AuthPointsModule } from '../auth-points';
import { RolesModule } from '../roles';
import { AuthPointController } from './auth-points.controller';
import { LoginSessionsController } from './login-sessions.controller';
import { RolesApiService } from './roles-api.service';
import { RolesController } from './roles.controller';
import { UsersController } from './users.controller';

@Module({
  imports: [
    RolesModule,
    AuthPointsModule,
    AuthModule,
    RolesModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UsersApiService, RolesApiService],
  controllers: [UsersController, LoginSessionsController, AuthPointController, RolesController],
})
export class WebServicesModule {}
