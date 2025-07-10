import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  getData(data: { id: number; name: string; surname: string }) {
    console.log("<===== DATA RECIEVED =====>");
    console.log(data);
  }

}
