import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getInfo', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController);
      const infoStr: any = appController.getHello();
      expect(infoStr.projectName).toBe('pardjs auth service');
    });
  });
});
