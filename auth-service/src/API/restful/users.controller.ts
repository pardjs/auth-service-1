import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { AuthPointName, CreateUserDto, SetUserRolesDto, UpdateUserDto, UserResponse} from '@pardjs/auth-service-common';
import { UsersServiceAuthPoints } from '../../BLL/auth-points/auth-points.enum';
import { AuthPointsService } from '../../BLL/auth-points/auth-points.service';
import { DynamicRolesGuard } from '../../BLL/auth/dynamic-roles.guard';
import { ADMIN_USER_ID, IP_WHITE_LIST_USER_ID } from '../../constants';
import { Errors } from '../../errors';
import { User } from '../../BLL/users/user.entity';
import { UsersService } from '../../BLL/users/users.service';
import { ChangePasswordDto } from './change-password.dto';
import { UsersApiService } from './users-api.service';

@Controller('/users')
@ApiUseTags('User')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userApiService: UsersApiService,
    private readonly authPointsService: AuthPointsService,
  ) {}

  @Post('')
  @ApiOperation({ operationId: 'create', title: 'create' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserResponse })
  @AuthPointName(UsersServiceAuthPoints.CREATE_USER)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  create(@Body() body: CreateUserDto) {
    return this.userApiService.create(body);
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
      where: {
        shownInApp: true,
        isDeleted: false,
      },
      order: { id: 'DESC' },
    });
    const count = await this.usersService.count({
      where: {
        shownInApp: true,
        isDeleted: false,
      },
    });
    return { data, count };
  }

  @Get('/me')
  @ApiOperation({ title: 'currentUser' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  currentUser(@Req() req: any) {
    return this.userApiService.toResponse(req.user as User);
  }

  @Get('/me/change-password')
  @ApiOperation({ title: 'currentUser' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  changePassword(@Req() req: any, @Body() data: ChangePasswordDto) {
    const user = req.user as UserResponse;
    return this.userApiService.changePassword(user, data);
  }

  @Get(':id')
  @ApiBearerAuth()
  @AuthPointName(UsersServiceAuthPoints.FIND_ONE_USER)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async findOne(@Param('id') id: number) {
    const found = await this.usersService.findById(id);
    if (!found || !found.shownInApp) {
      throw new BadRequestException(Errors.USER_NOT_FOUND);
    }
    return this.userApiService.toResponse(found);
  }

  @Get('me/actions/check-access')
  @ApiOperation({ title: 'check access' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponse,
  })
  async checkAccess(@Req() req: any, @Query('authPointName') authPointName: string) {
    const user = req.user as User;
    if ([ADMIN_USER_ID, IP_WHITE_LIST_USER_ID].includes(user.id) === false && authPointName && authPointName !== 'undefined') {
      const canAccess = await this.authPointsService.canAccess(authPointName, user.roles);
      if (!canAccess) {
        throw new UnauthorizedException();
      }
    }
    return this.userApiService.toResponse(user as User);
  }

  @Put('/:id/roles')
  @ApiBearerAuth()
  @AuthPointName(UsersServiceAuthPoints.SET_USER_ROLES)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  @ApiResponse({
    type: UserResponse,
    status: HttpStatus.OK,
  })
  setUserRoles(@Param('id') id: number, @Body() body: SetUserRolesDto) {
    if ([ADMIN_USER_ID, IP_WHITE_LIST_USER_ID].includes(id)) {
      throw new BadRequestException(Errors.BAD_OPERATION);
    }
    return this.userApiService.setUserRoles(id, body);
  }

  @Put('/:id')
  @AuthPointName(UsersServiceAuthPoints.UPDATE_USER)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  @ApiResponse({
    type: UserResponse,
    status: HttpStatus.OK,
  })
  async updateById(@Param('id') id: number, @Body() body: UpdateUserDto) {
    if ([ADMIN_USER_ID, IP_WHITE_LIST_USER_ID].includes(id)) {
      throw new BadRequestException(Errors.BAD_OPERATION);
    }
    const user = await this.usersService.updateById(id, body, true);
    return this.userApiService.toResponse(user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @AuthPointName(UsersServiceAuthPoints.DELETE_USER)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async deleteUser(@Param('id') id: number) {
    if ([ADMIN_USER_ID, IP_WHITE_LIST_USER_ID].includes(id)) {
      throw new BadRequestException(Errors.BAD_OPERATION);
    }
    return this.usersService.softDelete(id);
  }
}
