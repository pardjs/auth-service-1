import { PardjsUsersServiceSdkModule } from './../../../pkg-sdk/src/sdk.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PardjsUsersServiceSdkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
