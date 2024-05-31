import { Column, ForeignKey, BelongsTo, Model, PrimaryKey, Table, AutoIncrement } from "sequelize-typescript";
import { UserModel } from "../users/usersModel";

@Table({
  tableName: 'posts',
  timestamps: false
})
export class PostModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ allowNull: false })
    id: number;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    breed: string;

    @Column({ allowNull: false })
    photo_url: string;

    @Column({ allowNull: false })
    description: string;

    @Column({ allowNull: false })
    age: number;

    @Column({ allowNull: false })
    created_at: Date;

    @ForeignKey(() => UserModel)
    @Column({ allowNull: false, onDelete: "CASCADE" })
    owner_id: number;

    @BelongsTo(() => UserModel)
    owner: UserModel;
}