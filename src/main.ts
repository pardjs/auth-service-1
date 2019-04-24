import { config } from 'dotenv';
config();

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
import { PORT, SERVICE_BASE } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  const apiPrefix = '/api';
  app.setGlobalPrefix(apiPrefix);
  const docOptions = new DocumentBuilder()
    .setTitle('Pardjs Users service')
    .addBearerAuth()
    .setBasePath(SERVICE_BASE + apiPrefix)
    .setSchemes('http', 'https')
    .build();
  const doc = SwaggerModule.createDocument(app, docOptions);
  SwaggerModule.setup(SERVICE_BASE + (SERVICE_BASE ? '-' : '/') + 'api-doc', app, doc);
  await app.listen(PORT);
  logger.info('severing on http://0.0.0.0:' + PORT);
}
bootstrap();
