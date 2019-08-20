import { Transport } from '@nestjs/common/enums/transport.enum';
import { NestFactory } from '@nestjs/core';
import { logger } from '@pardjs/common';
import { join } from 'path';
import { GRPC_PORT } from '../constants';
import { AppModule } from './grpc-api.app.module';

export const bootGrpcApi = async () => {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${GRPC_PORT}`,
      package: 'authService',
      protoPath: join(process.cwd(), 'pkg-common/auth-service.proto'),
    },
  });
  await app.listenAsync();
  logger.info(`grpc api serving on 0.0.0.0:${GRPC_PORT}`);
};
