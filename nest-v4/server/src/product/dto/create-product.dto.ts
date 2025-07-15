import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty({ message: 'Name can not be empty' })
  @IsString({ message: 'Name must be string' })
  name: string;

  @IsNotEmpty({ message: 'Email can not be empty' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Price must be number' },
  )
  price: number;
}
