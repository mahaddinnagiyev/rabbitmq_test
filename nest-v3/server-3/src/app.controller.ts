import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('show_one')
  async requestData() {
    this.appService.requestData();
  }

  @EventPattern('data_returned')
  async dataReturned(
    @Payload()
    data:
      | {
          id: number;
          name: string;
          surname: string;
          department: string;
        }
      | undefined
      | string,
  ) {
    console.log('<===== RETURNED DATA =====>');
    console.log(data);
  }
}
