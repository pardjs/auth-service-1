import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { logger, MS_ONE_SECOND } from '@pardjs/common';
import { Request, Response } from 'express';

import { LoginByUsernameDto, LoginResponse } from '@pardjs/users-service-common';
import { IP_WHITE_LIST } from '../constants';
import { LoginSessionsService } from '../login-session';
import { User } from '../users';

@Controller()
@ApiUseTags('Login')
export class LoginSessionsController {
  constructor(private readonly loginSessionService: LoginSessionsService) {}
  @Post('login-by-username')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'login' })
  @ApiResponse({ status: HttpStatus.OK, type: LoginResponse })
  async loginByUsername(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: LoginByUsernameDto,
  ) {
    const loginResponse = await this.loginSessionService.loginByUsername(body);
    logger.info(JSON.stringify(loginResponse));
    res
      .cookie('authorization', loginResponse.token, {
        httpOnly: true,
        maxAge: loginResponse.expiresIn * MS_ONE_SECOND,
      })
      .json(loginResponse);
  }

  @Post('login-by-ip')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'login' })
  @ApiResponse({ status: HttpStatus.OK, type: LoginResponse })
  async loginByIp(@Req() req: Request) {
    let ip = (req.headers['x-forwarded-for'] as string) || req.ip;
    logger.info('loginByIp', { ip });
    if (ip.includes(':')) {
      ip = ip.split(':').pop();
    }
    logger.info('loginByIp', { ip });
    if (IP_WHITE_LIST.includes(ip)) {
      const res = await this.loginSessionService.loginByIp();
      logger.info('loginByIp res', res);
      return res;
    }
    throw new NotFoundException();
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'logout', title: 'logout' })
  @UseGuards(AuthGuard('jwt'))
  logout(@Req() req: any) {
    return this.loginSessionService.logout(req.user as User);
  }
}
