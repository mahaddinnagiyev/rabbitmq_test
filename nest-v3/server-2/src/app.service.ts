import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private data = [
    {
      id: 1,
      name: 'Mahaddin',
      surname: 'Nagiyev',
      department: 'IT',
    },
    {
      id: 2,
      name: 'Jamil',
      surname: 'Mahmudlu',
      department: 'IT',
    },
    {
      id: 3,
      name: 'John',
      surname: 'Doe',
      department: 'Marketing',
    },
    {
      id: 4,
      name: 'Jane',
      surname: 'Doe',
      department: 'Marketing',
    },
  ];

  constructor(
    @Inject('RETURN_DATA') private readonly returnDataClient: ClientProxy,
  ) {}

  showDataOnConsole() {
    console.log('<===== SERVER B RESPONSE =====>');
    console.log(this.data);
  }

  returnData(id: number) {
    let user:
      | {
          id: number;
          name: string;
          surname: string;
          department: string;
        }
      | undefined
      | string;

    user = this.data.find((d) => d.id === id);

    if (!user || user === undefined) {
      user = 'Not found';
    }

    return this.returnDataClient.emit('data_returned', user);
  }
}
