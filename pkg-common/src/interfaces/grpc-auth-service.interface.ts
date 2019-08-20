import { Observable } from 'rxjs';
import { CanAccessDto, RegisterAuthPointsDto } from '../auth-point-dto';
import { UserResponse } from '../user-dto';

export interface GrpcAuthService {
  registerAuthPoints(data: RegisterAuthPointsDto): Observable<boolean>;
  getWhiteListUserToken(): Observable<string>;
  loginWhiteListUser(): Observable<string>;
  canAccess(data: CanAccessDto): Observable<UserResponse>;
}
