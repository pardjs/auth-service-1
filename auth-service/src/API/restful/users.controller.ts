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
import { AuthPointName, CreateUserDto, SetUserRolesDto, UpdateUserDto, UserResponseDto, CreateAuthPointDto} from '@pardjs/auth-service-common';
import { AuthPoints, AuthPointsService, DynamicRolesGuard, User, UsersService } from '../../BLL';
import { ADMIN_USER_ID, IP_WHITE_LIST_USER_ID } from '../../constants';
import { Errors } from '../../errors';
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
  @ApiResponse({ status: HttpStatus.CREATED, type: UserResponseDto })
  @AuthPointName(AuthPoints.CREATE_USER)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  create(@Body() body: CreateUserDto) {
    return this.userApiService.create(body);
  }

  @Get('')
  @ApiOperation({ title: 'list' })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto, isArray: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  @AuthPointName(AuthPoints.FIND_USERS)
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
    const user = req.user as UserResponseDto;
    return this.userApiService.changePassword(user, data);
  }

  @Get('/me/auth-points')
  @ApiOperation({title: 'findCurrentUserAuthPoints'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({status: HttpStatus.OK, type: CreateAuthPointDto, isArray: true})
  findCurrentUserAuthPoints(@Req() req: any) {
    const user = req.user as UserResponseDto;
    return this.userApiService.findUserAuthPoints(user.id)
  }

  @Get(':id')
  @ApiBearerAuth()
  @AuthPointName(AuthPoints.FIND_ONE_USER)
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
    type: UserResponseDto,
  })
  async checkAccess(@Req() req: any, @Query('authPointName') authPointName: string) {
    const user = req.user as User;
    if ([ADMIN_USER_ID, IP_WHITE_LIST_USER_ID].includes(user.id) === false && authPointName && authPointName !== 'undefined') {
      const canAccess = await this.authPointsService.canAccess(authPointName, user.roles);
      if (!canAccess) {
        throw new UnauthorizedException();
      }
    }
    return this.userApiService.toResponse(user);
  }

  @Put('/:id/roles')
  @ApiBearerAuth()
  @AuthPointName(AuthPoints.SET_USER_ROLES)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  @ApiResponse({
    type: UserResponseDto,
    status: HttpStatus.OK,
  })
  setUserRoles(@Param('id') id: number, @Body() body: SetUserRolesDto) {
    if ([ADMIN_USER_ID, IP_WHITE_LIST_USER_ID].includes(id)) {
      throw new BadRequestException(Errors.BAD_OPERATION);
    }
    return this.userApiService.setUserRoles(id, body);
  }

  @Put('/:id')
  @AuthPointName(AuthPoints.UPDATE_USER)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  @ApiResponse({
    type: UserResponseDto,
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
  @AuthPointName(AuthPoints.DELETE_USER)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async deleteUser(@Param('id') id: number) {
    if ([ADMIN_USER_ID, IP_WHITE_LIST_USER_ID].includes(id)) {
      throw new BadRequestException(Errors.BAD_OPERATION);
    }
    return this.usersService.softDelete(id);
  }
}
