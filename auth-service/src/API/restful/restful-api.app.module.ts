import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { logger } from '@pardjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebServicesModule } from './web-services.module';

// tslint:disable-next-line: no-var-requires
const ormConfig = require(process.cwd() + '/ormconfig');
logger.info('ormconfig', {ormConfig});
@Module({
  imports: [TypeOrmModule.forRoot({...ormConfig, migrations: []}), WebServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
