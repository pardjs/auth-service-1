import { BadRequestException,
  HttpService, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { logger } from '@pardjs/common';
import { UserResponse } from '@pardjs/users-service-common';
import { AxiosError, AxiosResponse } from 'axios';
import { PARDJS_USERS_SERVICE_BASE_URL } from './constants';

@Injectable()
export class PardjsUsersService {
  constructor(private readonly httpService: HttpService){}

  private whiteListUserToken?: string;

  async registerAuthPoints(...authPoints: string[]) {
    const token = await this.getWhiteListUserToken();
    const res = await this.httpService.post(PARDJS_USERS_SERVICE_BASE_URL + '/auth-points/actions/register?access_token=' + token, {authPoints});
    return true;
  }

  async getWhiteListUserToken() {
    if (this.whiteListUserToken) {
      try {
        const canAccess = await this.canAccess(this.whiteListUserToken);
        if (canAccess) {
          return this.whiteListUserToken;
        }
      } catch (error) {
        // Just for preventing error be thrown.
      }
    }
    const token = await this.loginWhiteListUser();
    this.whiteListUserToken = token;
    return token;
  }

  async loginWhiteListUser() {
    try {
      // TODO: LoginResponse as the return type
      const res = await this.httpService.post<any>(PARDJS_USERS_SERVICE_BASE_URL + '/login-by-id').toPromise();
      return res.data.token as string;
    } catch (err) {
      this.handleError(err);
    }
  }

  async canAccess(token: string, authPointName?: string) {
    try {
      const res = await this.httpService.get<UserResponse>(PARDJS_USERS_SERVICE_BASE_URL +
        '/users/me/actions/check-access?access_token=' + token + '&authPointName=' + authPointName).toPromise();
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  private handleError(err: any) {
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
