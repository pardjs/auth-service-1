import { config } from 'dotenv';
config();

import * as Sentry from '@sentry/node';
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    serverName: process.env.SERVICE_NAME || 'pardjs-auth-service',
  });
}

import { bootGrpcApi } from './grpc-api/grpc-api.app';
import { bootRestfulApiApp } from './restful-api/restful-api.app';

async function bootstrap() {
  await bootRestfulApiApp();
  await bootGrpcApi();
}
bootstrap();
