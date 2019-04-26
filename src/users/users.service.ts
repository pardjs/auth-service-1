import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { superMd5 } from '@pardjs/common';
import { logger } from '@pardjs/common';
import {CreateUserDto, RoleResponseDto, UpdateUserDto, UserResponse} from '@pardjs/users-service-common';
import { FindManyOptions, Repository } from 'typeorm';
import {
  IP_WHITE_LIST_USER_NAME,
  PASSWORD_HASH_KEY,
  SUPER_ADMIN_INITIAL_PASSWORD,
} from '../constants';
import { UserErrors } from './errors';
import { User } from './user.entity';

const childLogger = logger.child({ service: 'users' });

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    (async () => {
      const userCount = await this.count();
      if (userCount === 0) {
        // Can access any auth point
        await this.create({
          username: 'admin',
          password: SUPER_ADMIN_INITIAL_PASSWORD,
          name: '超级管理员',
        });
        // Can access any point by default, but can be configured.
        // TODO: make white list user can be configured.
        await this.create({
          username: IP_WHITE_LIST_USER_NAME,
          password: 'n/a',
          name: IP_WHITE_LIST_USER_NAME,
        });
      }
    })();
  }

  async create(data: CreateUserDto): Promise<UserResponse> {
    const newUser = this.usersRepository.create({
      username: data.username,
      password: superMd5(data.password, PASSWORD_HASH_KEY),
      name: data.name,
    });
    const savedUser = await this.usersRepository.save(newUser);
    return this.toResponse(savedUser);
  }

  async count() {
    return this.usersRepository.count();
  }

  async find(options: FindManyOptions<User>) {
    options.where = options.where || {};
    const users = await this.usersRepository.find(options);
    return users.map(this.toResponse);
  }

  delete(id: number) {
    return this.usersRepository.delete(id);
  }

  async findById(userId: number): Promise<User> {
    const user = await this.findOne({ id: userId });
    return user;
  }

  toResponse(user: User): UserResponse {
    return {
      username: user.username,
      id: user.id,
      name: user.name,
      roles: user.roles ? user.roles.map(role => ({id: role.id, name: role.name} as RoleResponseDto)) : [],
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  async findOne(filter: Partial<User>) {
    return this.usersRepository.findOne({ ...filter });
  }

  async updateById(id: number, data: UpdateUserDto) {
    const found = await this.findOne({ id });
    if (!found) {
      throw new BadRequestException(UserErrors.USER_NOT_FOUND);
    }
    found.username = data.username;
    found.name = data.name;
    if (data.password) {
      found.password = superMd5(data.password, PASSWORD_HASH_KEY);
    }
    const saved = await this.usersRepository.save(found);
    return this.toResponse(saved);
  }

  findByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  save(user: User) {
    return this.usersRepository.save(user);
  }
}
