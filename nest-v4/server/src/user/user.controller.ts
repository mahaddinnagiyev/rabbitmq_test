import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() data: CreateUserDTO) {
    return await this.userService.createUser(data);
  }

  @Get('/get')
  async getUser(
    @Query('username') username: string,
    @Query('products') products?: boolean,
  ) {
    if (products) {
      return await this.userService.getUserWithProducts(username);
    }
    return await this.userService.getUser(username);
  }

  @Post('/login')
  async login(@Body() data: LoginDTO) {
    return await this.userService.login(data);
  }
}
