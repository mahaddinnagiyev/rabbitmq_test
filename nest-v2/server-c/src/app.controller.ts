import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/return')
  async returnData() {
    const data = this.appService.returnData();
    return data;
  }
}
