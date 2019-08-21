import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { logger } from '@pardjs/common';
import { AuthPointsModule } from '../../BLL/auth-points';
import { AuthServiceController } from './auth-service.controller';
import { HeroServiceController } from './hero-service.controller';

// tslint:disable-next-line: no-var-requires
const ormConfig = require(process.cwd() + '/ormconfig');
logger.info('ormconfig', { ormConfig });
@Module({
  imports: [
    TypeOrmModule.forRoot({ ...ormConfig, name: 'grpc-api', migrations: [] }),
    AuthPointsModule,
  ],
  controllers: [HeroServiceController, AuthServiceController],
})
export class AppModule {}
