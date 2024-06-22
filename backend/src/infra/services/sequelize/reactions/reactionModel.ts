import { Column, Model, PrimaryKey, Table, AutoIncrement, ForeignKey } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { UserModel } from "../users/usersModel";
import { PostModel } from "../posts/postModel";

@Table({
  tableName: 'reactions',
  timestamps: false
})
export class ReactionModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  id: number;

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false })
  user_id: number;

  @ForeignKey(() => PostModel)
  @Column({ allowNull: false })
  post_id: number;

  @Column({ allowNull: false, defaultValue: DataTypes.NOW })
  created_at: Date;
}
