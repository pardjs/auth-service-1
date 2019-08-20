import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HeroById } from '../../pkg-common/src/interfaces/hero-by-id.interface';
import { Hero } from '../../pkg-common/src/interfaces/hero.interface';

@Controller()
export class HeroServiceController {
  @GrpcMethod('HeroService', 'findOne')
  findOne(data: HeroById, metadata: any): Hero {
    const items = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }];
    return items.find(({ id }) => id === data.id);
  }
}
