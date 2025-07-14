import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('SERVER_B_REQUEST') private readonly serverB: ClientProxy,
    @Inject('SERVER_C_REQUEST') private readonly serverC: ClientProxy,
  ) {}

  async sendRequestData(type: 'get' | 'show') {
    try {
      if (type === 'show') this.serverB.emit('show_all', {});

      if (type === 'get') this.serverC.emit('show_one', {});

      return { status: 'OK' };
    } catch (error) {
      return { error };
    }
  }
}
