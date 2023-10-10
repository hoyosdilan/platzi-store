import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '../entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly date: string;

  @IsNumber()
  @IsNotEmpty()
  readonly user: User;

  @IsNumber()
  @IsNotEmpty()
  readonly products: Product[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
