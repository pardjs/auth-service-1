import { GrpcAuthService } from '@pardjs/auth-service-common';
import { CanActivate, ExecutionContext, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { fromAnywhere, logger } from '@pardjs/common';
import { AuthPointNameKey } from '@pardjs/auth-service-common';
import { GREEN_LIGHT_WITHOUT_USER_SERVICE, PARDJS_AUTH_SERVICE_GRPC_URL } from './constants';
import { grpcClientOptions } from './grpc-client.options';

const childLogger = logger.child({ service: 'dynamic-roles-guard' });

@Injectable()
export class GrpcAirRolesGuard implements CanActivate, OnModuleInit {
  @Client(grpcClientOptions)
  private readonly client!: ClientGrpc;

  private service!: GrpcAuthService;

  onModuleInit() {
    this.service = this.client.getService<GrpcAuthService>('AuthService');
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    if (!PARDJS_AUTH_SERVICE_GRPC_URL) {
      if (GREEN_LIGHT_WITHOUT_USER_SERVICE) {
        return true;
      } else {
        childLogger.error('no auth-service connected, reject by default.');
        return false;
      }
    }
    const request = context.switchToHttp().getRequest();
    if (!request.headers) {
      request.headers = {};
    }
    const token = fromAnywhere()(request) as string;
    const authPointName = Reflect.getMetadata(
      AuthPointNameKey,
      context.getHandler(),
    ) as string;
    logger.info('authPointName', { authPointName });
    const user = await this.service.canAccess({token, authPointName}).toPromise();
    request.user = user;
    return true;
  }
}
