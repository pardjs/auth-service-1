import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebServicesModule } from './web-services/web-services.module';

@Module({
  imports: [TypeOrmModule.forRoot(), WebServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
