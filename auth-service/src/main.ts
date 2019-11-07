import { config } from 'dotenv';
config();

import * as Sentry from '@sentry/node';
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    serverName: process.env.SERVICE_NAME || 'pardjs-auth-service',
  });
}

import { bootGrpcApi } from './API/grpc/grpc-api.app';
import { bootRestfulApiApp } from './API/restful/restful-api.app';
import { API_TYPE } from './constants';

async function bootstrap() {
  if (API_TYPE === 'restful') {
    await bootRestfulApiApp();
  }
  if (API_TYPE === 'grpc') {
    await bootGrpcApi();
  }
}
bootstrap();
