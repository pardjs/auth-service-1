import { Injectable } from '@nestjs/common';
import { SetRoleAuthPointsDto } from '@pardjs/auth-service-common';
import { In } from 'typeorm';
import { AuthPoint, AuthPointsService, RolesService, UsersService } from '../../BLL';

@Injectable()
export class RolesApiService {
  constructor(
    private readonly userService: UsersService,
    private readonly rolesService: RolesService,
    private readonly authPointsService: AuthPointsService,
  ) {

  }
  async setRoleAuthPoints(id: number, body: SetRoleAuthPointsDto) {
    const authPointIds = body.authPointIds || [];
    const role =  await this.rolesService.findById(id);
    let authPoints: AuthPoint[] = [];
    if (authPointIds.length > 0) {
      authPoints = await this.authPointsService.find({ where: { id: In(authPointIds)}});
    }
    role.authPoints = authPoints;
    const saved = await this.rolesService.save(role);
    return saved;
  }
}
