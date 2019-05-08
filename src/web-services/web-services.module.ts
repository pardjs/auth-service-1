import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth';
import { AuthPointsModule } from '../auth-points';
import { RolesModule } from '../roles';
import { AuthPointController } from './auth-points.controller';
import { LoginSessionsController } from './login-sessions.controller';
import { ManagementService } from './management-api.service';
import { ManagementController } from './management.controller';
import { RolesApiService } from './roles-api.service';
import { RolesController } from './roles.controller';
import { UsersApiService } from './users-api.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    RolesModule,
    AuthPointsModule,
    AuthModule,
    RolesModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    UsersApiService,
    RolesApiService,
    ManagementService,
  ],
  controllers: [
    UsersController,
    LoginSessionsController,
    ManagementController,
    AuthPointController,
    RolesController,
  ],
})
export class WebServicesModule {}
