import { Observable } from 'rxjs';
import { CanAccessDto, RegisterAuthPointsDto } from '../auth-point-dto';
import { UserResponse } from '../user-dto';
import { PardGrpcError } from './pard-grpc-error.interface';

export interface GrpcAuthService {
  registerAuthPoints(data: RegisterAuthPointsDto): Observable<boolean>;
  getWhiteListUserToken(): Observable<string>;
  loginWhiteListUser(): Observable<string>;
  canAccess(data: CanAccessDto): Observable<UserResponse | { error: PardGrpcError }>;
}
