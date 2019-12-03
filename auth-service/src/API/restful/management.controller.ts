import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthPointName, SetRoleAuthPointsDto, SetUserRolesDto } from '@pardjs/auth-service-common';
import { DeepPartial } from 'typeorm';
import { AuthPoints, DynamicRolesGuard,Role,RolesService, User, UsersService  } from '../../BLL';
import { ADMIN_USER_ID, IP_WHITE_LIST_USER_ID } from '../../constants';
import { Errors } from '../../errors';
import { ManagementService } from './management-api.service';
import { ParseIntPipe } from './parse-int.pipe';

@Controller('management')
@ApiUseTags('Management')
export class ManagementController {
  constructor(
    private readonly userService: UsersService,
    private readonly roleService: RolesService,
    private readonly managementService: ManagementService,
  ) {}

  @Post('users/:userId/actions/set-password')
  @ApiBearerAuth()
  @AuthPointName(AuthPoints.MGR_SET_USER_PASSWORD)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async setUserPassword(
    @Param('userId') userId: number,
    @Body('newPassword') newPassword: string,
  ) {
    const user = await this.userService.findById(userId);
    return this.userService.changePassword(user, newPassword);
  }

  @Get('users')
  @ApiBearerAuth()
  @AuthPointName(AuthPoints.MGR_FIND_USERS)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async findAllUsers() {
    return this.userService.findAndCount({});
  }

  @Get('roles')
  @ApiBearerAuth()
  @AuthPointName(AuthPoints.MGR_FIND_ROLES)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async findAllRoles() {
    return this.roleService.findAndCount({});
  }

  @Get('users/:id')
  @ApiBearerAuth()
  @AuthPointName(AuthPoints.MGR_FIND_ONE_USER)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async findUserById(@Param('id') userId: number) {
    return this.userService.findById(userId);
  }

  @Get('roles/:id')
  @ApiBearerAuth()
  @AuthPointName(AuthPoints.MGR_FIND_ONE_ROLE)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async findRoleById(@Param('id') id: number) {
    return this.roleService.findByIdDetail(id);
  }

  @Post('users')
  @ApiBearerAuth()
  @AuthPointName(AuthPoints.MGR_CREATE_USER)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async createUser(@Body() data: DeepPartial<User>) {
    return this.userService.create(data);
  }

  @Post('roles')
  @ApiBearerAuth()
  @AuthPointName(AuthPoints.MGR_CREATE_USER)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async createRole(@Body() data: DeepPartial<Role>) {
    return this.roleService.create(data.name, data.isDefault, data.shownInApp);
  }

  @Put('users/:userId/roles')
  @ApiBearerAuth()
  @AuthPointName(AuthPoints.MGR_SET_USER_ROLES)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async setUserRoles(
    @Param('userId') userId: number,
    @Body() data: SetUserRolesDto,
  ) {
    console.log(data)
    return this.managementService.setUserRoles(userId, data.roleIds);
  }

  @Put('roles/:roleId/auth-points')
  @ApiBearerAuth()
  @AuthPointName(AuthPoints.MGR_SET_ROLE_AUTH_POINTS)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async setRoleAuthPoints(
    @Param('roleId') roleId: number,
    @Body() data: SetRoleAuthPointsDto,
  ) {
    return this.managementService.setRoleAuthPoints(roleId, data.authPointIds);
  }

  @Put('users/:userId')
  @ApiBearerAuth()
  @AuthPointName(AuthPoints.MGR_UPDATE_USER)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async updateUser(
    @Param('userId') userId: number,
    @Body() data: DeepPartial<User>,
  ) {
    return this.managementService.updateUser(userId, data);
  }

  @Put('roles/:roleId')
  @ApiBearerAuth()
  @AuthPointName(AuthPoints.MGR_UPDATE_USER)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async updateRole(
    @Param('roleId') roleId: number,
    @Body() data: DeepPartial<Role>,
  ) {
    return this.managementService.updateRole(roleId, data);
  }

  @Delete('users/:id')
  @ApiBearerAuth()
  @AuthPointName(AuthPoints.DELETE_USER)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async deleteUser(@Param('id', new ParseIntPipe()) id: number) {
    if ([ADMIN_USER_ID, IP_WHITE_LIST_USER_ID].includes(id)) {
      throw new BadRequestException(Errors.BAD_OPERATION);
    }
    return this.userService.delete(id);
  }
}
