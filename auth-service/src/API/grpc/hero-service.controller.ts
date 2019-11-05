import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HeroById, Hero } from '@pardjs/auth-service-common';

@Controller()
export class HeroServiceController {
  @GrpcMethod('HeroService', 'findOne')
  findOne(data: HeroById, metadata: any): Hero {
    const items = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }];
    return items.find(({ id }) => id === data.id);
  }
}
