import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  async sendRequestData(type: 'get' | 'show') {
    if (type === 'show')
      await fetch('http://localhost:3001/show', {
        method: 'GET',
      });

    if (type === 'get') {
      const response = await fetch('http://localhost:3002/return', {
        method: 'GET',
      });

      return await response.json();
    }

    return { status: 'OK' };
  }
}
