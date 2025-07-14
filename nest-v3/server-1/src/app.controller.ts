import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async sendRequestData(@Query('type') type: 'get' | 'show') {
    return await this.appService.sendRequestData(type);
  }
}
