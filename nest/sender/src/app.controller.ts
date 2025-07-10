import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/send')
  async getHello() {
    const data = {
      id: Math.random(),
      name: 'Mahaddin',
      surname: 'Nagiyev',
    };

    return await this.appService.sendMessage(data);
  }
}
