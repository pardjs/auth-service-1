import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { superMd5 } from '@pardjs/common';
import { logger } from '@pardjs/common';
import { FindConditions, FindManyOptions, Repository } from 'typeorm';
import { PASSWORD_HASH_KEY, SUPER_ADMIN_INITIAL_PASSWORD } from '../constants';
import { CreateUserDto } from './create-user.dto';
import { UserErrors } from './errors';
import { UpdateUserDto } from './update-user.dto';
import { UserResponse } from './user-response.dto';
import { UserRoles } from './user-roles';
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
        await this.create({
          employeeId: '1001',
          password: SUPER_ADMIN_INITIAL_PASSWORD,
          showName: '超级管理员',
          role: 'ADMIN',
        });
      }
    })();
  }

  async create(data: CreateUserDto): Promise<UserResponse> {
    const newUser = this.usersRepository.create({
      employeeId: data.employeeId,
      password: superMd5(data.password, PASSWORD_HASH_KEY),
      role: data.role,
      showName: data.showName,
    });
    const savedUser = await this.usersRepository.save(newUser);
    return this.toResponse(savedUser);
  }

  async count() {
    return this.usersRepository.count();
  }

  async find(options: FindManyOptions<User>) {
    options.where = options.where || {};
    logger.info(JSON.stringify(options));
    const users = await this.usersRepository.find(options);
    logger.info(JSON.stringify(users));
    return users.map(this.toResponse);
  }

  delete(id: number) {
    return this.usersRepository.delete(id);
  }

  async findById(userId: number): Promise<User> {
    const user = await this.findOne({ id: userId });
    return user;
  }

  toResponse(user: User) {
    return {
      employeeId: user.employeeId,
      role: user.role,
      id: user.id,
      showName: user.showName,
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
    found.employeeId = data.employeeId;
    found.role = data.role;
    found.showName = data.showName;
    if (data.password) {
      found.password = superMd5(data.password, PASSWORD_HASH_KEY);
    }
    const saved = await this.usersRepository.save(found);
    return this.toResponse(saved);
  }

  findByEmployeeId(employeeId: string) {
    return this.usersRepository.findOne({ where: { employeeId } });
  }
}
