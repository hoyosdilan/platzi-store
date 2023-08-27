import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly fecha: string;

  @IsNumber()
  @IsNotEmpty()
  readonly total: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
