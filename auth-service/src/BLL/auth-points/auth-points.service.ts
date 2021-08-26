import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterAuthPointsDto } from '@pardjs/auth-service-common';
import { logger } from '@pardjs/common-1';
import * as _ from 'lodash';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { BllError } from '../bll-error';
import { Role } from '../roles/role.entity';
import { AuthPoint } from './auth-point.entity';
import {
  AuthPoints,
  UsersServiceAuthPointNames,
} from './auth-points.enum';
import { AuthPointErrorKeys, AuthPointsErrors } from './errors';

@Injectable()
export class AuthPointsService {
  constructor(
    @InjectRepository(AuthPoint)
    private readonly repository: Repository<AuthPoint>,
  ) {
    (async () => {
      // tslint:disable-next-line:forin
      for (const key in AuthPoints) {
        await this.upsertByName(
          AuthPoints[key],
          UsersServiceAuthPointNames[AuthPoints[key]],
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
      const newAuthPoint = this.repository.create({ name, displayName });
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
      return new BllError(
        AuthPointErrorKeys.AUTH_POINT_NOT_FOUND,
        AuthPointsErrors,
        HttpStatus.UNAUTHORIZED,
      );
    }
    const authPointRoleIds = authPoint.roles.map(role => role.id);
    const userRoleIds = userRoles.map(role => role.id);
    const intersection = _.intersection(authPointRoleIds, userRoleIds);
    logger.info('intersection', { intersection });
    if (intersection.length > 0) {
      return true;
    } else {
      return new BllError(
        AuthPointErrorKeys.NO_ACCESS_GRANTED,
        AuthPointsErrors,
        HttpStatus.UNAUTHORIZED,
      );
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
