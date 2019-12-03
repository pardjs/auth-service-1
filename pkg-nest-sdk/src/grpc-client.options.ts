import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PARDJS_AUTH_SERVICE_GRPC_URL } from '.';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'authService',
    url: PARDJS_AUTH_SERVICE_GRPC_URL || 'localhost:6000',
    protoPath: join(
      __dirname,
      '../node_modules/@pardjs/auth-service-common/auth-service.proto',
    ),
  },
};
