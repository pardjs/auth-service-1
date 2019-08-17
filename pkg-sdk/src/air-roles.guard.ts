import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { fromAnywhere, logger } from '@pardjs/common';
import { AuthPointNameKey } from '@pardjs/users-service-common';
import { PARDJS_USERS_SERVICE_BASE_URL, GREEN_LIGHT_WITHOUT_USER_SERVICE } from './constants';
import { PardjsUsersService } from './service';

const childLogger = logger.child({ service: 'dynamic-roles-guard' });

@Injectable()
export class AirRolesGuard implements CanActivate {
  constructor(private service: PardjsUsersService) {
    if (!this.service && PARDJS_USERS_SERVICE_BASE_URL) {
      this.service = new PardjsUsersService();
    }
  }
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    if (!PARDJS_USERS_SERVICE_BASE_URL) {
      if (GREEN_LIGHT_WITHOUT_USER_SERVICE) {
        return true;
      } else {
        childLogger.error('no users-service connected, reject by default.');
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
    const user = await this.service.canAccess(
      token,
      authPointName,
    );
    request.user = user;
    return true;
  }
}
