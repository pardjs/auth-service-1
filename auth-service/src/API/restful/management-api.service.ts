import { Injectable } from '@nestjs/common';
import { DeepPartial, In } from 'typeorm';
import { AuthPointsService } from '../../BLL/auth-points/auth-points.service';
import { Role } from '../../BLL/roles/role.entity';
import { RolesService } from '../../BLL/roles/roles.service';
import { User } from '../../BLL/users/user.entity';
import { UsersService } from '../../BLL/users/users.service';

@Injectable()
export class ManagementService {
  constructor(
    private userService: UsersService,
    private roleService: RolesService,
    private authPointService: AuthPointsService,
  ) {}

  async setUserRoles(userId: number, roleIds: number[]) {
    const user = await this.userService.findById(userId);
    if (roleIds.length > 0) {
      const roles = await this.roleService.find({where: {id: In(roleIds)}});
      user.roles = roles;
    } else {
      user.roles = [];
    }
    return this.userService.save(user);
  }
  async setRoleAuthPoints(roleId: number, authPointIds: number[]) {
    const role = await this.roleService.findById(roleId);
    if (authPointIds && authPointIds.length > 0) {
      const authPoints = await this.authPointService.find({where: {id: In(authPointIds)}});
      role.authPoints = authPoints;
    } else {
      role.authPoints = [];
    }
    return this.roleService.save(role);
  }
  updateUser(userId: number, data: DeepPartial<User>) {
    return this.userService.updateById(userId, data);
  }
  updateRole(roleId: number, data: DeepPartial<Role>) {
    return this.roleService.update(roleId, data.name, data.isDefault, data.shownInApp);
  }
}
