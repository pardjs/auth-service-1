import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthPointName } from '@pardjs/auth-service-common';
import { AirRolesGuard } from '@pardjs/auth-service-sdk';
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
