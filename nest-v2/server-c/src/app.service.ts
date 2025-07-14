import { Injectable } from '@nestjs/common';
import { AppService as ServerBService } from 'server-c-event';

@Injectable()
export class AppService {
  constructor(private serverB: ServerBService) {}

  returnData() {
    return {
      status: "OK",
      data: this.serverB.returnData()
    }
  }
}
