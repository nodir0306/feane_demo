import { UserRoles } from "../models";

export declare interface CreateUserRequest {
  name: string;
  phone: string;
  email: string;
  image?: Express.Multer.File;
  role?: UserRoles;
}
