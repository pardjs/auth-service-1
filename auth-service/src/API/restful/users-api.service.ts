import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RoleResponseDto, SetUserRolesDto, UserResponseDto } from '@pardjs/auth-service-common';
import { superMd5 } from '@pardjs/common';
import { In } from 'typeorm';
import { Role, RolesService, User, UsersService } from '../../BLL';
import { PASSWORD_HASH_KEY } from '../../constants';
import { Errors } from '../../errors';
import { ChangePasswordDto } from './change-password.dto';

@Injectable()
export class UsersApiService {
  constructor(
    private readonly roleService: RolesService,
    private readonly userService: UsersService,
  ) {

  }
  async setUserRoles(id: number, body: SetUserRolesDto) {
    const roleIds = body.roleIds || [];
    const user =  await this.userService.findById(id);
    let roles: Role[] = [];
    if (roleIds.length > 0) {
      roles = await this.roleService.find({where: {
        id: In(roleIds),
        shownInApp: true,
      }});
    }
    user.roles = roles;
    const saved = await this.userService.save(user);
    return this.toResponse(saved);
  }

  async findUserAuthPoints(id: number) {
    const user = await this.userService.findById(id)
    const roleIds = user.roles.map(role => role.id)
    if (roleIds.length === 0) {
      return []
    }
    const roles = await this.roleService.find({
      where: {id: In(roleIds)},
      join: {
        alias: 'role',
        leftJoinAndSelect: {
          'authPoints': 'role.authPoints'
        }
      }
    })
    return Object.values(roles.reduce((prev, cur) => {
      for(let authPoint of cur.authPoints) {
        prev[authPoint.id.toString()] = authPoint
      }
      return prev
    }, {}))
  }

  // TODO: only accept the params needed.
  async create(body: CreateUserDto) {
    let savedUser = await this.userService.create(body);
    const roles = await this.roleService.findDefaultRoles();
    if (roles && roles.length > 0) {
      savedUser.roles  = roles;
      savedUser = await this.userService.save(savedUser);
    }
    return savedUser;
  }

  async changePassword(userRes: UserResponseDto, data: ChangePasswordDto) {
    const user = await this.userService.findOne({
      username: userRes.username,
      password: superMd5(data.oldPassword, PASSWORD_HASH_KEY),
    });
    if (!user) {
      throw new BadRequestException(Errors.WRONG_PASSWORD);
    }
    await this.userService.changePassword(user, data.newPassword);
    return { success: true };
  }

  toResponse(user: User): UserResponseDto {
    return {
      username: user.username,
      id: user.id,
      name: user.name,
      roles: user.roles ? user.roles.map(role => ({ id: role.id, name: role.name } as RoleResponseDto)) : [],
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
