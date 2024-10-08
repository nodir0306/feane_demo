import { User } from './models';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserImageDto } from './dtos';
export declare class UserController {
    private service;
    constructor(service: UserService);
    getAllUsers(): Promise<User[]>;
    createUser(payload: CreateUserDto, image: Express.Multer.File): Promise<void>;
    uploadUserImage(payload: UpdateUserImageDto, image: Express.Multer.File): Promise<void>;
    deleteUser(userId: number): Promise<void>;
}
