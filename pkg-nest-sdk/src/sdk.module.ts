import { HttpModule, Module } from '@nestjs/common';
import { PardjsUsersService } from './service';

@Module({
  imports: [HttpModule],
  providers: [PardjsUsersService],
  exports: [PardjsUsersService],
})
export class PardjsUsersServiceSdkModule {

}
