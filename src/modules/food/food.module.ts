import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Food } from './models';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { UploadService } from '../upload';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Food])],
  providers: [UploadService, JwtService, FoodService],
  controllers: [FoodController],
})
export class FoodModule {}
