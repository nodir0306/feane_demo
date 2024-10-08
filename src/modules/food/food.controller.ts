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
import { Food } from './models';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Foods')
@Controller('foods')
export class FoodController {
  #_service: FoodService;

  constructor(service: FoodService) {
    this.#_service = service;
  }
  @ApiOperation({ summary: 'Get all foods' })
  @Get()
  async getAllFoods(): Promise<Food[]> {
    return await this.#_service.getAllFoods();
  }
  @ApiOperation({ summary: 'create food' })
  @ApiConsumes('multipart/form-data')
  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  async createFood(
    @Body() createFoodPayload: CreateFoodDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.#_service.createFood({
      ...createFoodPayload,
      image: image,
    });
  }

  @ApiOperation({ summary: 'Delete Food' })
  @Delete('/delete/:foodId')
  async deleteFood(
    @Param('foodId', ParseIntPipe) foodId: number,
  ): Promise<void> {
    await this.#_service.deleteFood(foodId);
  }
}
