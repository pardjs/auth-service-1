import {
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
import { AuthPointName, CreateUserDto, UpdateUserDto, UserResponse} from '@pardjs/users-service-common';
import { UsersServiceAuthPoints } from '../auth-points/auth-points.enum';
import { AuthPointsService } from '../auth-points/auth-points.service';
import { DynamicRolesGuard } from '../auth/dynamic-roles.guard';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Controller('/users')
@ApiUseTags('User')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authPointsService: AuthPointsService,
  ) {}

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

  @Get('me/actions/check-access')
  @ApiOperation({ title: 'check access' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async checkAccess(@Req() req: any, @Query('authPointName') authPointName: string) {
    const user = req.user as User;
    if (authPointName && authPointName !== 'undefined') {
      const canAccess = await this.authPointsService.canAccess(authPointName, user.roles);
      if (!canAccess) {
        throw new UnauthorizedException();
      }
    }
    return this.usersService.toResponse(user as User);
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
