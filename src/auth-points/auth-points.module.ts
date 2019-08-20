import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthPoint } from './auth-point.entity';
import { AuthPointsService } from './auth-points.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthPoint], 'restful-api')],
  providers: [AuthPointsService],
  exports: [AuthPointsService],
})
export class AuthPointsModule {}
