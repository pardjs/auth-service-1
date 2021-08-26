process.env.PARDJS_AUTH_SERVICE_BASE_URL = 'http://localhost:5000';
import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from '@pardjs/common-1';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(4000);
}
bootstrap();
