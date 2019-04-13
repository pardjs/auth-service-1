import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly repository: Repository<Role>,
  ) {}

  public async findByIds(options?: FindManyOptions<Role>) {
    return this.repository.find(options);
  }
}
