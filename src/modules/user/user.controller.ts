import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './models';
import { UserService } from './user.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserImageDto } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags("Users")
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @ApiOperation({ summary: 'Barcha userlarni olish' })
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.service.getAllUsers();
  }

  @ApiOperation({ summary: 'Yangi user yaratish' })
  @ApiConsumes('multipart/form-data')
  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  async createUser(
    @Body() payload: CreateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.service.createUser({ ...payload, image });
  }

  @ApiOperation({ summary: 'User rasmini qo\'shish va/yoki yangilash' })
  @ApiConsumes('multipart/form-data')
  @Post('/add/image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadUserImage(
    @Body() payload: UpdateUserImageDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.service.uploadUserImage({...payload, image});
  }

  @Delete('/delete/:userId')
  @ApiOperation({ summary: "Userni o'chirish" })
  async deleteUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    await this.service.deleteUser(userId);
  }
}
