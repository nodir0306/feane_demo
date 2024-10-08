import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Category } from '@modules';

@Table({ tableName: 'foods', timestamps: true })
export class Food extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.TEXT, allowNull: false, unique: true })
    name: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    description: string

    @Column({ type: DataType.INTEGER, allowNull: false })
    price: number

    @Column({ type: DataType.TEXT, allowNull: false })
    image: string;

    @ForeignKey(() => Category)
    @Column({ type: DataType.BIGINT, allowNull: false, onDelete: "CASCADE", onUpdate: "NO ACTION" })
    category_id: number

    @BelongsTo(() => Category)
    category: Category
}
