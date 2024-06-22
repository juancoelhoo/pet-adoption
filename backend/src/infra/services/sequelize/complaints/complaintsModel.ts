import { Column, ForeignKey, BelongsTo, Model, PrimaryKey, Table, AutoIncrement } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { UserModel } from "../users/usersModel";
import { PostModel } from "../posts/postModel";

@Table({
  tableName: 'complaints',
  timestamps: false
})
export class ComplaintModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  id: number;

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false })
  reporter_user_id: number;

  @BelongsTo(() => UserModel, 'reporter_user_id')
  reporterUser: UserModel;

  @ForeignKey(() => PostModel)
  @Column({ allowNull: false })
  reported_post_id: number;

  @BelongsTo(() => PostModel, 'reported_post_id')
  reportedPost: PostModel;

  @Column({ allowNull: false, defaultValue: DataTypes.NOW })
  created_at: Date;

  @Column({ allowNull: true })
  reason: string;
}
