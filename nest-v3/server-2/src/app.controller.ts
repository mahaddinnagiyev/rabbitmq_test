import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('show_all')
  async showDataOnConsole() {
    return this.appService.showDataOnConsole();
  }

  @MessagePattern('request_data')
  async returnRequestedData(@Payload() id: number) {
    return this.appService.returnData(id);
  }
}
