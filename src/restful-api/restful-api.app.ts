
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  corsOptions,
  HttpExceptionFilter,
  logger,
  ValidationPipe,
} from '@pardjs/common';
import * as cookieParser from 'cookie-parser';
import { API_PREFIX, PORT, SERVICE_BASE } from '../constants';
import { AppModule } from './restful-api.app.module';

export const bootRestfulApiApp = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix(API_PREFIX);
  const docOptions = new DocumentBuilder()
    .setTitle('Pardjs Auth service')
    .addBearerAuth()
    .setBasePath(SERVICE_BASE + API_PREFIX)
    .setSchemes('http', 'https')
    .build();
  const doc = SwaggerModule.createDocument(app, docOptions);
  SwaggerModule.setup(SERVICE_BASE + (SERVICE_BASE ? '-' : '/') + 'api-doc', app, doc);
  await app.listen(PORT);
  logger.info('restful api severing on http://0.0.0.0:' + PORT);
};
