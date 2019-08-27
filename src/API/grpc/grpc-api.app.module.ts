import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { logger } from '@pardjs/common';
import { AuthPointsModule } from '../../BLL/auth-points';
import { LoginSessionsModule } from '../../BLL/login-session';
import { AuthServiceController } from './auth-service.controller';
import { GrpcApiService } from './grpc-api.service'
import { HeroServiceController } from './hero-service.controller';

// tslint:disable-next-line: no-var-requires
const ormConfig = require(process.cwd() + '/ormconfig');
logger.info('ormconfig', { ormConfig });
@Module({
  imports: [
    TypeOrmModule.forRoot({ ...ormConfig, migrations: [] }),
    AuthPointsModule,
    LoginSessionsModule,
  ],
  providers: [GrpcApiService],
  controllers: [HeroServiceController, AuthServiceController],
})
export class AppModule {}
