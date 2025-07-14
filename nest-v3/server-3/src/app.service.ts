import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('REQUEST_DATA') private readonly requestDataClient: ClientProxy,
  ) {}

  requestData() {
    const id = 2;

    this.requestDataClient.emit('request_data', id);
  }
}
