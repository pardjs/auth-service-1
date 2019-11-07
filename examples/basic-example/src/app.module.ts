import { Module } from '@nestjs/common';
import {PardjsUsersServiceSdkModule} from '@pardjs/auth-service-sdk';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PardjsUsersServiceSdkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
