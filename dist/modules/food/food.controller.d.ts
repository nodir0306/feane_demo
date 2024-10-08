import { Food } from './models';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dtos';
export declare class FoodController {
    #private;
    constructor(service: FoodService);
    getAllFoods(): Promise<Food[]>;
    createFood(createFoodPayload: CreateFoodDto, image: Express.Multer.File): Promise<void>;
    deleteFood(foodId: number): Promise<void>;
}
