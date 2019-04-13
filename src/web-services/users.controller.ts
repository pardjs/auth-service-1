import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
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
import { IP_WHITE_LIST } from 'src/constants';
import { AuthPointName } from '../../pkg-common/dist';
import { UsersServiceAuthPoints } from '../auth-points/auth-points.enum';
import { DynamicRolesGuard } from '../auth/dynamic-roles.guard';
import { LoginByUsernameDto } from '../login-session';
import { LoginResponse } from '../login-session/login-response.dto';
import { LoginSessionsService } from '../login-session/login-sessions.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UserResponse } from '../users/dto/user-response.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Controller('/users')
@ApiUseTags('User')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly loginSessionService: LoginSessionsService,
  ) {}

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

  @Post('')
  @ApiOperation({ operationId: 'create', title: 'create' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserResponse })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get('')
  @ApiOperation({ title: 'list' })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse, isArray: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  @AuthPointName(UsersServiceAuthPoints.FIND_USERS)
  async find(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    const data = await this.usersService.find({
      skip: offset,
      take: limit,
      order: { id: 'DESC' },
    });
    const count = await this.usersService.count();
    return { data, count };
  }

  @Get('me')
  @ApiOperation({ title: 'currentUser' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  currentUser(@Req() req: any) {
    return this.usersService.toResponse(req.user as User);
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  updateById(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.usersService.updateById(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async deleteUser(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
