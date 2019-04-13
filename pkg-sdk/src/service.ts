import { BadRequestException,
  HttpService, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { logger } from '@pardjs/common';
import { UserResponse } from '@pardjs/users-service-common';
import { AxiosError, AxiosResponse } from 'axios';
import { PARDJS_USERS_SERVICE_BASE_URL } from './constants';

@Injectable()
export class PardjsUsersService {
  constructor(private readonly httpService: HttpService) {}

  async canAccess(token: string, authPointName?: string): Promise<UserResponse> {
    try {
      const res = await this.httpService.get<UserResponse>(PARDJS_USERS_SERVICE_BASE_URL +
        '/users/me/actions/check-access?access_token=' + token + '&authPointName=' + authPointName).toPromise();
      return res.data;
    } catch (err) {
      const httpError = err as AxiosError;
      logger.error('http error when checking access', Object.keys(err));
      if (!err.response) {
        throw new InternalServerErrorException({
          type: 'CONNECT_PARDJS_USERS_SERVER_FAILED',
          message: 'connect to pardjs users service failed.',
        });
      }
      const res = err.response as AxiosResponse;
      if (res.status === HttpStatus.UNAUTHORIZED) {
        throw new UnauthorizedException(res.data.error);
      }
      throw new BadRequestException(res.data.error);
    }
  }
}
