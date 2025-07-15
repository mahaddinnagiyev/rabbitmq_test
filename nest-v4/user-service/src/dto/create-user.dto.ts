import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Username can not be empty' })
  @IsString({ message: 'Username must be string' })
  username: string;

  @IsNotEmpty({ message: 'Email can not be empty' })
  @IsString({ message: 'Email must be string' })
  email: string;

  @IsNotEmpty({ message: 'Password can not be empty' })
  @IsString({ message: 'Password must be string' })
  password: string;
}
