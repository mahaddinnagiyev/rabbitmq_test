import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  async createUser(newUser: CreateUserDTO) {
    const response = this.userService.send({ cmd: 'newUser' }, newUser);

    return response;
  }

  async getUser(username: string): Promise<
    Observable<{
      _id: string;
      username: string;
      email: string;
      password: string;
    }>
  > {
    const response = this.userService.send(
      { cmd: 'getUserByUsername' },
      username,
    );

    return response;
  }

  async login(data: LoginDTO) {
    const response = this.userService.send({ cmd: 'login' }, data);

    return response;
  }
}
