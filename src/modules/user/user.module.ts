import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UploadService } from '../upload';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService, UploadService],
  controllers: [UserController],
})
export class UserModule {}
