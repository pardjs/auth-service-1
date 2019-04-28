import { Injectable } from '@nestjs/common';
import { DeepPartial, In } from 'typeorm';
import { RolesService } from '../roles/roles.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ManagementService {
  constructor(
    private userService: UsersService,
    private roleService: RolesService,
  ) {}

  async setUserRoles(userId: number, roleIds: number[]) {
    const roles = await this.roleService.find({where: {id: In(roleIds)}});
    const user = await this.userService.findById(userId);
    user.roles = roles;
    return this.userService.save(user);
  }
  updateUser(userId: number, data: DeepPartial<User>) {
    return this.userService.updateById(userId, data);
  }
}
