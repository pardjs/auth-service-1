import { AuthPointName } from '@pardjs/users-service-common';
import { AirRolesGuard } from './../../../pkg-sdk/src/air-roles.guard';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('tester')
  @UseGuards(AirRolesGuard)
  @AuthPointName('EXAMPLE_TESTER')
  me(@Req() req: any) {
    return req.user;
  }
}
