import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthPointsModule } from '../auth-points/auth-points.module';
import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../roles/roles.module';
import { UsersController } from './users.controller';

@Module({
  imports: [
    RolesModule,
    AuthPointsModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [],
  controllers: [UsersController],
})
export class WebServicesModule {}
