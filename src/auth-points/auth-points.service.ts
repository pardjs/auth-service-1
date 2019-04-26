import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { logger } from '@pardjs/common';
import { RegisterAuthPointsDto } from '@pardjs/users-service-common';
import * as _ from 'lodash';
import { FindOneOptions, Repository, FindManyOptions } from 'typeorm';
import { Role } from '../roles/role.entity';
import { AuthPoint } from './auth-point.entity';
import {
  UsersServiceAuthPointNames,
  UsersServiceAuthPoints,
} from './auth-points.enum';
import { AuthPointsErrors } from './errors';

@Injectable()
export class AuthPointsService {
  constructor(
    @InjectRepository(AuthPoint)
    private readonly repository: Repository<AuthPoint>,
  ) {
    (async () => {
      // tslint:disable-next-line:forin
      for (const key in UsersServiceAuthPoints) {
        await this.upsertByName(
          UsersServiceAuthPoints[key],
          UsersServiceAuthPointNames[UsersServiceAuthPoints[key]],
        );
      }
    })();
  }

  findOne(options?: FindOneOptions<AuthPoint>) {
    return this.repository.findOne(options);
  }

  async upsertByName(name: string, displayName: string) {
    const authPoint = await this.findOne({ where: { name } });
    if (authPoint) {
      if (authPoint.displayName === displayName) {
        return authPoint;
      } else {
        authPoint.displayName = displayName;
        return this.repository.save(authPoint);
      }
    } else {
      const newAuthPoint = await this.repository.create({ name, displayName });
      return this.repository.save(newAuthPoint);
    }
  }

  async canAccess(name: string, userRoles: Role[]) {
    const authPoint = await this.findOne({
      where: { name },
      join: {
        alias: 'authPoint',
        leftJoinAndSelect: {
          roles: 'authPoint.roles',
        },
      },
    });
    if (!authPoint) {
      throw new UnauthorizedException(AuthPointsErrors.AUTH_POINT_NOT_FOUND);
    }
    const authPointRoleIds = authPoint.roles.map(role => role.id);
    const userRoleIds = userRoles.map(role => role.id);
    const intersection = _.intersection(authPointRoleIds, userRoleIds);
    logger.info('intersection', { intersection });
    if (intersection.length > 0) {
      return true;
    } else {
      throw new UnauthorizedException(AuthPointsErrors.NO_ACCESS_GRANTED);
    }
  }

  async register(data: RegisterAuthPointsDto) {
      for (const item of data.authPoints) {
        await this.upsertByName(item.name, item.displayName);
      }
  }

  find(options?: FindManyOptions<AuthPoint>) {
    return this.repository.find(options);
  }

  findAndCount() {
    return this.repository.findAndCount();
  }
}
