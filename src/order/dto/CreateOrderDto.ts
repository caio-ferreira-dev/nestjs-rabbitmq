import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class ItemDto {
  @IsNotEmpty()
  @IsString()
  productId!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  unitPrice!: number;
}

class PaymentDto {
  @IsNotEmpty()
  @IsString()
  method!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  installment!: number;
}

class DeliveryDto {
  @IsNotEmpty()
  @IsString()
  addressId!: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  customerId!: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items!: ItemDto[];

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PaymentDto)
  payment!: PaymentDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DeliveryDto)
  delivery!: DeliveryDto;
}
