import { Observable } from 'rxjs';
import { CanAccessDto, RegisterAuthPointsDto } from '../dtos/auth-point-dto';
import { UserResponseDto } from '../dtos/user-dto';
import { PardGrpcError } from './pard-grpc-error.interface';

export interface GrpcAuthService {
  registerAuthPoints(data: RegisterAuthPointsDto): Observable<boolean>;
  canAccess(data: CanAccessDto): Observable<UserResponseDto | { error: PardGrpcError }>;
}
