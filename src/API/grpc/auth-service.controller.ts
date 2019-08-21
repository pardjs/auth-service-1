import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserResponse } from 'pkg-common/dist';
import { Observable } from 'rxjs';
import { CanAccessDto, RegisterAuthPointsDto } from '../../../pkg-common/src';
import { GrpcAuthService } from '../../../pkg-common/src/interfaces/grpc-auth-service.interface';
import { HeroById } from '../../../pkg-common/src/interfaces/hero-by-id.interface';
import { Hero } from '../../../pkg-common/src/interfaces/hero.interface';

@Controller()
export class AuthServiceController implements GrpcAuthService {
  registerAuthPoints(data: RegisterAuthPointsDto): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  getWhiteListUserToken(): Observable<string> {
    throw new Error('Method not implemented.');
  }
  loginWhiteListUser(): Observable<string> {
    throw new Error('Method not implemented.');
  }
  @GrpcMethod('AuthService', 'canAccess')
  canAccess(data: CanAccessDto): Observable<UserResponse> {
    throw new Error('Method not implemented.');
  }
}
