import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Food } from './models';
import { CreateFoodRequest } from './interfaces';
import { UploadService } from '../upload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FoodService {
  #_uploadService: UploadService;
  #_jwtService: JwtService;
  constructor(
    @InjectModel(Food) private foodModel: typeof Food,
    upload: UploadService,
    jwtService: JwtService,
  ) {
    this.#_uploadService = upload;
    this.#_jwtService = jwtService;
  }

  async getAllFoods(): Promise<Food[]> {
    const accessToken = await this.#_jwtService.signAsync(
      { role: 'admin' },
      {
        expiresIn: 60,
        secret: 'my secret',
      },
    );
    console.log(accessToken);
    return await this.foodModel.findAll();
  }

  async createFood(payload: CreateFoodRequest): Promise<void> {
    const fileOptions = await this.#_uploadService.uploadFile({
      file: payload.image,
      destination: 'uploads/foods',
    });

    await this.foodModel.create({
      name: payload.name,
      description: payload.description,
      price: payload.price,
      image: fileOptions.imageUrl,
      category_id: payload.categoryId,
    });
  }

  async deleteFood(id: number): Promise<void> {
    const foundedFood = await this.foodModel.findByPk(id);

    await this.#_uploadService.removeFile({ fileName: foundedFood.image });

    await this.foodModel.destroy({ where: { id } });
  }
}
