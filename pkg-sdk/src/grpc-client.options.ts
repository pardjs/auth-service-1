import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'authService',
    url: process.env.AUTH_SERVICE_GRPC_URL || 'localhost:6000',
    protoPath: join(
      __dirname,
      '../node_modules/@pardjs/auth-service-common/auth-service.proto',
    ),
  },
};
