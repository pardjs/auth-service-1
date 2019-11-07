import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CanAccessDto, GrpcAuthService, PardGrpcError, RegisterAuthPointsDto, UserResponseDto } from '@pardjs/auth-service-common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { from, Observable, of } from 'rxjs';
import { mergeMap} from 'rxjs/operators';
import { GrpcApiService } from './grpc-api.service';

@Controller()
export class AuthServiceController implements GrpcAuthService {
  constructor(private readonly service: GrpcApiService) {}

  @GrpcMethod('AuthService', 'registerAuthPoints')
  registerAuthPoints(data: RegisterAuthPointsDto): Observable<boolean> {
    return of(true);
  }

  @GrpcMethod('AuthService', 'canAccess')
  canAccess(data: CanAccessDto): Observable<UserResponseDto | {error: PardGrpcError}> {
    const realData = plainToClass(CanAccessDto, data);
    return from(validate(realData)).pipe(
      mergeMap(errors => {
        if (errors && errors.length > 0) {
          const err = {
            code: 'INVALID_PARAMETERS',
            message: `${errors[0].property} is not valid`,
          };
          return Promise.resolve({error: err});
        } else {
          return this.service.canAccess(realData);
        }
      }),
    );
  }
}
