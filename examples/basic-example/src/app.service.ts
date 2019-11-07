import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! I am @pardjs/auth-service-sdk demo';
  }
}
