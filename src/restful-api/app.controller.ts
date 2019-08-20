import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
  constructor(private readonly appService: AppService) {}
  private projectInfo: string;
  onModuleInit() {
    this.projectInfo = readFileSync(join(process.cwd(), 'project-info.json')).toString('utf8');
  }

  @Get()
  getHello(): string {
    return this.projectInfo;
  }
}
