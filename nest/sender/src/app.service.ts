import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('NEST_SERVICE') private rabbitClient: ClientProxy) {}

  async sendMessage(data: { id: number; name: string; surname: string }) {
    this.rabbitClient.emit('data-send', data);

    return { status: 'OK' };
  }
}
  