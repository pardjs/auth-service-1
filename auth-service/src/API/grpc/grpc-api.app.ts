import { Transport } from '@nestjs/common/enums/transport.enum';
import { NestFactory } from '@nestjs/core';
import { logger } from '@pardjs/common';
import { join } from 'path';
import { GRPC_PORT } from '../../constants';
import { AppModule } from './grpc-api.app.module';

const protoPath = join(process.cwd(), 'node_modules/@pardjs/auth-service-common/auth-service.proto');

export const bootGrpcApi = async () => {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${GRPC_PORT}`,
      package: 'authService',
      protoPath,
    },
  });
  await app.listenAsync();
  logger.info(`grpc api serving on 0.0.0.0:${GRPC_PORT}`);
};
