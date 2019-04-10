import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { LoginSessionsService } from './login-sessions.service';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly loginSessionsService: LoginSessionsService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLoginSession(payload: JwtPayload): Promise<any> {
    return await this.loginSessionsService.validate(payload);
  }
}
