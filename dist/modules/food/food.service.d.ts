import { Food } from './models';
import { CreateFoodRequest } from './interfaces';
import { UploadService } from '../upload';
import { JwtService } from '@nestjs/jwt';
export declare class FoodService {
    #private;
    private foodModel;
    constructor(foodModel: typeof Food, upload: UploadService, jwtService: JwtService);
    getAllFoods(): Promise<Food[]>;
    createFood(payload: CreateFoodRequest): Promise<void>;
    deleteFood(id: number): Promise<void>;
}
