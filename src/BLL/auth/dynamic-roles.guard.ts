import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { logger } from '@pardjs/common';
import { AuthPointNameKey } from '@pardjs/users-service-common';
import { AuthPointsService } from '../auth-points/auth-points.service';

import { ADMIN_USER_ID, IP_WHITE_LIST_USER_ID } from '../../constants';
import { User } from '../users/user.entity';

const childLogger = logger.child({ service: 'dynamic-roles-guard' });

@Injectable()
export class DynamicRolesGuard implements CanActivate {
  constructor(private readonly authPointsService: AuthPointsService) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    if (!user) {
      childLogger.error('user not found', {
        reqBody: request.body,
        reqHeaders: request.headers,
      });
      return false;
    }
    logger.info('user found in DynamicRolesGuard', { user });

    const authPointName = Reflect.getMetadata(
      AuthPointNameKey,
      context.getHandler(),
    ) as string;
    logger.info('authPointName', { authPointName });
    if (user.id === ADMIN_USER_ID) {
      return true;
    }
    if (user.id === IP_WHITE_LIST_USER_ID && user.roles.length === 0) {
      return true;
    }
    const canAccess = await this.authPointsService.canAccess(
      authPointName,
      user.roles,
    );
    return canAccess;
  }
}
