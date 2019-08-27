import { Injectable } from '@nestjs/common';
import { CanAccessDto, JwtPayload, UserResponse } from '../../../pkg-common/src';
import { PardGrpcError } from '../../../pkg-common/src/interfaces/pard-grpc-error.interface';
import { AuthPointsService } from '../..//BLL/auth-points/auth-points.service';
import { BllError } from '../../BLL/bll-error';
import { LoginSessionsService } from '../../BLL/login-session';
import { UsersService } from '../../BLL/users';

@Injectable()
export class GrpcApiService {
  constructor(
    private readonly authPointService: AuthPointsService,
    private readonly userService: UsersService,
    private readonly loginSessionService: LoginSessionsService,
  ) {}

  async canAccess(data: CanAccessDto): Promise<UserResponse | { error: PardGrpcError }> {
    const { token, authPointName } = data;
    const jwtPayload = this.loginSessionService.decodeToken(token);
    if (jwtPayload && BllError.isBllError(jwtPayload)) {
      return {error: (jwtPayload as any as BllError).toGrpc()};
    }
    const user = await this.loginSessionService.validate(jwtPayload as JwtPayload);
    if (authPointName) {
      const valid = await this.authPointService.canAccess(authPointName, user.roles);
      if (valid && BllError.isBllError(valid)) {
        return { error: (valid as any as BllError).toGrpc() };
      }
      if (!valid) {
        return {error: new PardGrpcError(
          `${authPointName} is not allowed to access`,
          'ACCESS_DENIED',
        )};
      }
    }
    return {
      ...user,
      createdAt: user.createdAt.toJSON(),
      updatedAt: user.updatedAt.toJSON(),
    };
  }
}
