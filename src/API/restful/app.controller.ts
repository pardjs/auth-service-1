import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { logger } from '@pardjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
  constructor(private readonly appService: AppService) {}
  private projectInfo: object;
  onModuleInit() {
    const jsonContent = readFileSync(join(process.cwd(), 'project-info.json')).toString('utf8');
    this.projectInfo = JSON.parse(jsonContent);
  }

  @Get()
  getHello() {
    logger.info('projectInfo:', { projectInfo: this.projectInfo });
    if (!this.projectInfo) {
      this.onModuleInit();
    }
    return this.projectInfo;
  }
}
