import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  corsOptions,
  HttpExceptionFilter,
  logger,
  ValidationPipe,
} from '@pardjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  const docOptions = new DocumentBuilder()
    .setTitle('Pardjs Users service')
    .addBearerAuth()
    .setBasePath(
      process.env.NODE_ENV === 'production' ? '/users-service-api' : '',
    )
    .build();
  const doc = SwaggerModule.createDocument(app, docOptions);
  SwaggerModule.setup('/users-service-api-doc', app, doc);
  await app.listen(3000);
  logger.info('severing on http://0.0.0.0:3000');
}
bootstrap();
