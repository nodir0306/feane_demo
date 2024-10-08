import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User } from "../user";

@Module({
    imports: [SequelizeModule.forFeature([User])],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}