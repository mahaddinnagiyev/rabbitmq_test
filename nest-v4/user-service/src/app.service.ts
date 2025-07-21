import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { LoginDTO } from './dto/login.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject('RABBITMQ_PRODUCT') private readonly rabbitmqProduct: ClientProxy,
  ) {}

  async newUser(data: CreateUserDTO) {
    const { username, email, password } = data;

    const isUsernameExist = await this.getUserByUsername(username);

    if (isUsernameExist) {
      return { error: 'Username already taken' };
    }

    const isEmailExist = await this.userModel.findOne({ email });

    if (isEmailExist) {
      return { error: 'Email already registered' };
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async getUserByUsername(username: string) {
    const user = await this.userModel.findOne({ username: username });

    if (!user) return null;

    return user;
  }

  async getUserWithProducts(username: string) {
    const user = await this.getUserByUsername(username);

    if (!user) return { error: 'User not found' };

    const response = await lastValueFrom(
      this.rabbitmqProduct.send({ cmd: 'get_user_product' }, user._id),
    );

    console.log('response: ', response);
    console.log('response.toPromise: ', response);

    return {
      user,
      products: response,
    };
  }

  async login(data: LoginDTO) {
    const { username, password } = data;

    const findUser = await this.getUserByUsername(username);

    if (!findUser) return { error: 'User Not Found' };

    const isPasswordMatch = await bcrypt.compare(password, findUser.password);

    if (!isPasswordMatch) return { error: 'Invalid credentials' };

    const token = jwt.sign(
      { username: findUser.username },
      'ACCESS_TOKEN_SECRET_KEY',
      {
        expiresIn: '7d',
      },
    );

    return { token };
  }
}
