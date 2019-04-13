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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { AuthPointName } from '../../pkg-common/dist';
import { UsersServiceAuthPoints } from '../auth-points/auth-points.enum';
import { DynamicRolesGuard } from '../auth/dynamic-roles.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UserResponse } from '../users/dto/user-response.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Controller('/users')
@ApiUseTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
