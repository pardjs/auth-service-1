import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { logger } from '@pardjs/common';
import { AuthServiceController } from './auth-service.controller';
import { HeroServiceController } from './hero-service.controller';

// tslint:disable-next-line: no-var-requires
const ormConfig = require('../../ormconfig');
logger.info('ormconfig', { ormConfig });
@Module({
  imports: [
    TypeOrmModule.forRoot({ ...ormConfig, name: 'grpc-api', migrations: [] }),
  ],
  controllers: [HeroServiceController, AuthServiceController],
})
export class AppModule {}
