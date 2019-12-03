import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly repository: Repository<Role>,
  ) {}

  private buildFindManyOptions(options?: FindManyOptions<Role>) {
    const finalOptions: FindManyOptions<Role> = options || {};
    if (!finalOptions.order) finalOptions.order = {}
    if (Object.keys(finalOptions.order).length === 0) finalOptions.order.id = 'DESC'
    return finalOptions
  }

  public async find(options?: FindManyOptions<Role>) {
    return this.repository.find(this.buildFindManyOptions(options));
  }

  public async findAndCount(options?: FindManyOptions<Role>) {
    const roles = await this.repository.findAndCount(this.buildFindManyOptions(options));
    return {data: roles[0], count: roles[1]}
  }

  public async findById(id: number) {
    return this.repository.findOne({where: {id}});
  }

  public async findByIdDetail(id: number) {
    return this.repository.findOne({ where: { id }, join: {
      alias: 'role',
      leftJoinAndSelect: { authPoints: 'role.authPoints' },
    } });
  }

  async update(id: number, name: string, isDefault?: boolean, shownInApp?: boolean) {
    const role = await this.findById(id);
    role.name = name;
    if (isDefault !== undefined) {
      role.isDefault = isDefault;
    }
    if (shownInApp !== undefined) {
      role.shownInApp = shownInApp;
    }
    return this.repository.save(role);
  }
  create(name: string, isDefault: boolean = false, shownInApp: boolean = true) {
    const newRole = this.repository.create({name});
    return this.repository.save(newRole);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }

  save(role: Role) {
    return this.repository.save(role);
  }

  findDefaultRoles() {
    return this.repository.find({where: {isDefault: true}});
  }
}
