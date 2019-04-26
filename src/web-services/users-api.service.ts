import { Injectable } from '@nestjs/common';
import { SetUserRolesDto } from '@pardjs/users-service-common';
import { In } from 'typeorm';
import { Role } from '../roles/role.entity';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';

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
      roles = await this.roleService.find({where: {id: In(roleIds)}});
    }
    user.roles = roles;
    const saved = await this.userService.save(user);
    return this.userService.toResponse(saved);
  }
}
