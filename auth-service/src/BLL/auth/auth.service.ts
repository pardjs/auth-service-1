import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@pardjs/auth-service-common';
import { LoginSessionsService } from '../login-session/login-sessions.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly loginSessionsService: LoginSessionsService) {}

  async validateLoginSession(payload: JwtPayload): Promise<any> {
    return await this.loginSessionsService.validate(payload);
  }
}
