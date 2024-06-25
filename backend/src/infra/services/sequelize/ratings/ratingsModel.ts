import { Column, ForeignKey, BelongsTo, Model, PrimaryKey, Table, AutoIncrement } from "sequelize-typescript";
import { UserModel } from "../users/usersModel";

@Table({
  tableName: 'ratings',
  timestamps: false
})
export class RatingModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ allowNull: false })
    id: number;

    @Column({ allowNull: false })
    grade: number;

    @ForeignKey(() => UserModel)
    @Column({ allowNull: false, onDelete: "CASCADE" })
    reporter_user_id: number;

    @ForeignKey(() => UserModel)
    @Column({ allowNull: false, onDelete: "CASCADE" })
    reported_user_id: number;

    @Column({ allowNull: false })
    created_at: Date;

    @BelongsTo(() => UserModel, {onDelete: "cascade", foreignKey: "reporter_user_id"})
    reporter: UserModel;

    @BelongsTo(() => UserModel, {onDelete: "cascade", foreignKey: "reported_user_id"})
    reported: UserModel;
}
