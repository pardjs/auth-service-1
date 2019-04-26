import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly repository: Repository<Role>,
  ) {}

  public async find(options?: FindManyOptions<Role>) {
    return this.repository.find(options);
  }

  public async findAndCount(options?: FindManyOptions<Role>) {
    return this.repository.findAndCount(options);
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

  async update(id: number, name: string) {
    await this.repository.update({ id }, { name });
    return this.findById(id);
  }
  create(name: string) {
    const newRole = this.repository.create({name});
    return this.repository.save(newRole);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }

  save(role: Role) {
    return this.repository.save(role);
  }
}
