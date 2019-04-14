import { Module } from '@nestjs/common';
import {PardjsUsersServiceSdkModule} from '@pardjs/users-service-sdk';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PardjsUsersServiceSdkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
