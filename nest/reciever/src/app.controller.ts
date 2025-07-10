import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('data-send')
  getData(
    @Payload() data: { id: number; name: string; surname: string },
    @Ctx() context: RmqContext,
  ) {
    console.log('message: ', context.getMessage());

    return this.appService.getData(data);
  }

  // @MessagePattern('data-send')
  // getData1(@Payload() data: { id: number; name: string; surname: string }) {
  //   return this.appService.getData(data);
  // }
}
