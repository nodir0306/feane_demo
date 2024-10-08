import {
  IsArray,
  IsInt,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderRequest, OrderItemInterface } from '../interfaces';
import { Type } from 'class-transformer';
import { OrderItem } from '../models';

export class CreateOrderDto implements CreateOrderRequest {
  @ApiProperty({
    type: "array",
    items: {
      type: "object",
      properties: {
        foodId: { type: "number", example: 1 },
        quantity: { type: "number", example: 2 },
      },
      required: ["foodId", "quantity"],
    }
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  orderItems: OrderItemInterface[];

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'User id berilishi shart',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    type: Number,
    example: 100000,
    description: 'Total price',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  totalPrice: number;
}
