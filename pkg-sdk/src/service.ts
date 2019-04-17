import { BadRequestException,
  HttpService, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { logger } from '@pardjs/common';
import { LoginResponse, RegisterAuthPointsDto, UserResponse } from '@pardjs/users-service-common';
import axios, { AxiosError, AxiosResponse, AxiosInstance } from 'axios';
import { PARDJS_USERS_SERVICE_BASE_URL } from './constants';

@Injectable()
export class PardjsUsersService {
  private httpService: AxiosInstance;
  constructor() {
    this.httpService = axios.create({
      baseURL: PARDJS_USERS_SERVICE_BASE_URL,
    });
    logger.info('users service base url', {PARDJS_USERS_SERVICE_BASE_URL});
  }

  private whiteListUserToken?: string;

  async registerAuthPoints(data: RegisterAuthPointsDto) {
    const token = await this.getWhiteListUserToken();
    const res = await this.httpService.post('/auth-points/actions/register?access_token=' + token, data);
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
    const url = '/login-by-ip';
    try {
      // TODO: LoginResponse as the return type
      const res = await this.httpService.post<LoginResponse>(url);
      return res.data.token;
    } catch (err) {
      this.handleError(err, 'loginWhiteListUser', url);
    }
  }

  async canAccess(token: string, authPointName?: string) {
    const url = '/users/me/actions/check-access?access_token=' + token + '&authPointName=' + authPointName;
    try {
      const res = await this.httpService.get<UserResponse>(url);
      return res.data;
    } catch (err) {
      this.handleError(err, 'canAccess', url);
    }
  }

  private handleError(err: any, methodName?: string, url?: string) {
    const httpError = err as AxiosError;
    logger.error('http error when checking access', {errMessage: err.message});
    if (!err.response) {
      logger.error('connection failed', {err, methodName, url});
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
