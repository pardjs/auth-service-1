import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthPointName, SetUserRolesDto } from '@pardjs/users-service-common';
import { DeepPartial } from 'typeorm';
import { UsersServiceAuthPoints } from '../auth-points/auth-points.enum';
import { DynamicRolesGuard } from '../auth/dynamic-roles.guard';
import { ADMIN_USER_ID, IP_WHITE_LIST_USER_ID } from '../constants';
import { Errors } from '../errors';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { ManagementService } from './management-api.service';

@Controller('management')
export class UserManagementController {
  constructor(
    private readonly userService: UsersService,
    private readonly managementService: ManagementService,
  ) {}

  @Post('users/:userId/actions/set-password')
  @ApiBearerAuth()
  @AuthPointName(UsersServiceAuthPoints.MGR_SET_USER_PASSWORD)
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
  @AuthPointName(UsersServiceAuthPoints.MGR_FIND_USERS)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async findAllUsers() {
    return this.userService.find({});
  }

  @Post('users')
  @ApiBearerAuth()
  @AuthPointName(UsersServiceAuthPoints.MGR_CREATE_USER)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async createUser(@Body() data: DeepPartial<User>) {
    return this.userService.create(data);
  }

  @Post('users/:userId/roles')
  @ApiBearerAuth()
  @AuthPointName(UsersServiceAuthPoints.MGR_CREATE_USER)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async setUserRoles(
    @Param('userId') userId: number,
    @Body() data: SetUserRolesDto,
  ) {
    return this.managementService.setUserRoles(userId, data.roleIds);
  }

  @Put('users/:userId')
  @ApiBearerAuth()
  @AuthPointName(UsersServiceAuthPoints.MGR_UPDATE_USER)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async updateUser(
    @Param('userId') userId: number,
    @Body() data: DeepPartial<User>,
  ) {
    return this.managementService.updateUser(userId, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @AuthPointName(UsersServiceAuthPoints.DELETE_USER)
  @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
  async deleteUser(@Param('id') id: number) {
    if ([ADMIN_USER_ID, IP_WHITE_LIST_USER_ID].includes(id)) {
      throw new BadRequestException(Errors.BAD_OPERATION);
    }
    return this.userService.delete(id);
  }
}
