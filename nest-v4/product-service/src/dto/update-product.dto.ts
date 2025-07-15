import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'Name can not be empty' })
  @IsString({ message: 'Name must be string' })
  name?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Email can not be empty' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Price must be number' },
  )
  price?: number;
}
