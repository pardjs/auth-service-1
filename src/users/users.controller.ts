import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { MS_ONE_SECOND } from '@pardjs/common';
import { logger } from '@pardjs/common';
import { RolesGuard } from '@pardjs/common';
import { Request, Response } from 'express';
import { LoginByIdDto } from '../login-session/login-by-id.dto';
import { LoginResponse } from '../login-session/login-response.dto';
import { LoginSessionsService } from '../login-session/login-sessions.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './dto/user-response.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('/users')
@ApiUseTags('User')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly loginSessionService: LoginSessionsService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'login' })
  @ApiResponse({ status: HttpStatus.OK, type: LoginResponse })
  async padLogin(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: LoginByIdDto,
  ) {
    const loginResponse = await this.loginSessionService.loginById(body);
    logger.info(JSON.stringify(loginResponse));
    res
      .cookie('authorization', loginResponse.token, {
        httpOnly: true,
        maxAge: loginResponse.expiresIn * MS_ONE_SECOND,
      })
      .json(loginResponse);
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get('')
  @ApiOperation({ title: 'list' })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse, isArray: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateById(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.usersService.updateById(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async deleteUser(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
