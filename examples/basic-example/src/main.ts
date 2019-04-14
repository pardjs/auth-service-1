process.env.PARDJS_USERS_SERVICE_BASE_URL = 'http://localhost:5000';
import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from '@pardjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(4000);
}
bootstrap();
