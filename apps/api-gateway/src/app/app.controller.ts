import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('thread')
  async getThread() {
    return this.appService.getThread();
  }

  @Get('user')
  async getUser() {
    return this.appService.getUser();
  }
}
