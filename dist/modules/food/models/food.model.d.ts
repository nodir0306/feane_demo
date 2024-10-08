import { Model } from 'sequelize-typescript';
import { Category } from '@modules';
export declare class Food extends Model {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category_id: number;
    category: Category;
}
