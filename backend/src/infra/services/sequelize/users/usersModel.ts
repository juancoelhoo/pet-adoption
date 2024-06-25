import { Column, Model, PrimaryKey, Table, AutoIncrement, HasMany } from "sequelize-typescript";
import { PostModel } from "../posts/postModel";

@Table({
  tableName: 'users',
  timestamps: false
})
export class UserModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ allowNull: false })
    id: number;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false, unique: true })
    email: string;

    @Column({ allowNull: false })
    password: string;

    @Column({ allowNull: true })
    photo_url: string;

    @Column({ allowNull: true })
    description: string;

    @Column({ allowNull: true })
    address: string;

    @Column({ allowNull: true })
    phone: string;

    @Column({ allowNull: false, defaultValue: 0 })
    permissions: number;

    @HasMany(() => PostModel, {onDelete: "cascade"})
    posts: PostModel[];
}