import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthModule, AuthPointsModule, LoginSessionsModule, RolesModule,UsersModule } from '../../BLL';
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
    UsersModule,
    LoginSessionsModule
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
