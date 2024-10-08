import { CreateUserRequest } from '../interfaces';
import { UserRoles } from '../models';
export declare class CreateUserDto implements Omit<CreateUserRequest, 'image'> {
    email: string;
    name: string;
    phone: string;
    image?: any;
    role?: UserRoles;
}
