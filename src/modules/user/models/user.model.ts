import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Order } from '@modules';

export enum UserRoles {
  user = 'USER',
  admin = 'ADMIN',
}

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  phone: string;

  @Column({ type: DataType.TEXT, allowNull: false, unique: true })
  email: string;

  @Column({
    type: DataType.ENUM,
    values: [UserRoles.admin, UserRoles.user],
    allowNull: false,
    defaultValue: UserRoles.user,
  })
  role: UserRoles;

  @Column({ type: DataType.TEXT, allowNull: true })
  image?: string;

  @HasMany(() => Order)
  orders: Order[];

}
