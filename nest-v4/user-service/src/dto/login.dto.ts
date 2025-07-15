import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'Username can not be empty' })
  @IsString({ message: 'Username must be string' })
  username: string;

  @IsNotEmpty({ message: 'Password can not be empty' })
  @IsString({ message: 'Password must be string' })
  password: string;
}
