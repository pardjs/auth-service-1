import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { fromAnywhere, logger } from '@pardjs/common';
import { AuthPointNameKey } from '@pardjs/users-service-common';
import { UserResponse } from '@pardjs/users-service-common';
import { PardjsUsersService } from './service';

const childLogger = logger.child({ service: 'dynamic-roles-guard' });

@Injectable()
export class AirRolesGuard implements CanActivate {
  constructor(private service: PardjsUsersService) {
    if (!this.service) {
      this.service = new PardjsUsersService();
    }
  }
  public async canActivate(context: ExecutionContext): Promise<boolean> {
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
    const user = await this.service.canAccess(
      token,
      authPointName,
    );
    request.user = user;
    return true;
  }
}
