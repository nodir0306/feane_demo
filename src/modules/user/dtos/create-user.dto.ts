import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserRequest } from '../interfaces';
import { UserRoles } from '../models';

export class CreateUserDto implements Omit<CreateUserRequest, 'image'> {
  @ApiProperty({
    type: String,
    required: true,
    example: 'john.doe@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'john doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '+998933211232',
    maxLength: 13,
    minLength: 13
  })
  @IsPhoneNumber("UZ")
  @Length(13, 13)
  phone: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: any;

  @ApiProperty({
    enum: UserRoles,
    name: "Role",
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRoles)
  role?: UserRoles;
}
