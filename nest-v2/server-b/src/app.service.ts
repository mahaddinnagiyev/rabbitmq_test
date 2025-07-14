import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private data = {
    id: Math.random(),
    name: 'Mahaddin',
    surname: 'Nagiyev',
    department: 'IT',
  };

  showDataOnConsole() {
    console.log(this.data);
  }

  returnData() {
    return this.data;
  }
}
