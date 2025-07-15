import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'newUser' })
  async newUser(@Payload() newUser: CreateUserDTO) {
    return await this.appService.newUser(newUser);
  }

  @MessagePattern({ cmd: 'getUserByUsername' })
  async getUserByUsername(@Payload() username: string) {
    return await this.appService.getUserByUsername(username);
  }

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() loginDto: LoginDTO) {
    return await this.appService.login(loginDto);
  }
}
