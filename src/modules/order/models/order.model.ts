import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { OrderItem } from './order-item.model';
import { User } from '@modules';

export enum OrderStatus {
  progress,
  completed,
  canceled,
}

@Table({ tableName: 'orders', timestamps: true })
export class Order extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  total_price: number;

  @Column({ type: DataType.DATE, defaultValue: Date.now() })
  createdAt?: Date;

  @Column({
    type: DataType.TEXT,
    defaultValue: OrderStatus.progress,
    allowNull: false,
  })
  status: OrderStatus;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  user_id: number;

  @HasMany(() => OrderItem)
  order_items: OrderItem[];
}
