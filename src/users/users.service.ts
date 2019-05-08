import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { superMd5 } from '@pardjs/common';
import { logger } from '@pardjs/common';
import {CreateUserDto, RoleResponseDto, UpdateUserDto, UserResponse} from '@pardjs/users-service-common';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { ADMIN_USER_ID, IP_WHITE_LIST_USER_ID } from '../constants';
import {
  IP_WHITE_LIST_USER_NAME,
  PASSWORD_HASH_KEY,
  SUPER_ADMIN_INITIAL_PASSWORD,
} from '../constants';
import { Errors } from '../errors';
import { User } from './user.entity';

const childLogger = logger.child({ service: 'users' });

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    (async () => {
      const userCount = await this.count({
        where: {
          id: ADMIN_USER_ID,
        },
      });
      if (userCount === 0) {
        // Can access any auth point
        await this.create({
          id: ADMIN_USER_ID,
          username: 'admin',
          password: SUPER_ADMIN_INITIAL_PASSWORD,
          name: '超级管理员',
          shownInApp: false,
        });
      }

      const userWhiteCount = await this.count({
        where: {
          id: IP_WHITE_LIST_USER_ID,
        },
      });
      if (userWhiteCount === 0) {
        // Can access any point by default, but can be configured.
        // TODO: make white list user can be configured.
        await this.create({
          id: IP_WHITE_LIST_USER_ID,
          username: IP_WHITE_LIST_USER_NAME,
          password: 'n/a',
          name: IP_WHITE_LIST_USER_NAME,
          shownInApp: false,
        });
      }
    })();
  }

  async create(data: DeepPartial<User>) {
    const newUser = this.usersRepository.create({
      username: data.username,
      password: superMd5(data.password, PASSWORD_HASH_KEY),
      name: data.name,
    });
    const savedUser = await this.usersRepository.save(newUser);
    return savedUser;
  }

  async count(options?: FindManyOptions<User>) {
    return this.usersRepository.count(options);
  }

  async find(options: FindManyOptions<User>) {
    options.where = options.where || {};
    const users = await this.usersRepository.find(options);
    return users;
  }

  async changePassword(user: User, newPassword: string) {
    user.password = superMd5(newPassword, PASSWORD_HASH_KEY);
    return this.save(user);
  }

  delete(id: number) {
    return this.usersRepository.delete(id);
  }

  async findById(userId: number): Promise<User> {
    const user = await this.findOne({ id: userId });
    return user;
  }

  async findOne(filter: Partial<User>) {
    return this.usersRepository.findOne({ ...filter });
  }

  async updateById(id: number, data: UpdateUserDto | DeepPartial<User>, onlyShown = false) {
    const found = await this.findOne({ id });
    if (!found || (onlyShown && !found.shownInApp)) {
      throw new BadRequestException(Errors.USER_NOT_FOUND);
    }
    found.username = data.username;
    found.name = data.name;
    if (data.password) {
      found.password = superMd5(data.password, PASSWORD_HASH_KEY);
    }
    if ((data as User).shownInApp === false) {
      found.shownInApp = false;
    }
    if ((data as User).shownInApp === true) {
      found.shownInApp = true;
    }
    const saved = await this.usersRepository.save(found);
    return saved;
  }

  findByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  save(user: User) {
    return this.usersRepository.save(user);
  }

  async softDelete(id: number) {
    await this.usersRepository.update({id}, {isDeleted: true});
  }
}
