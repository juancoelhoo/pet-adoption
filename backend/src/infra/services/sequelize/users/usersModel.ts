import { Model, Table } from "sequelize-typescript";

@Table({
  tableName: 'users',
  timestamps: false
})
export class UserModel extends Model {
    // TODO: Complete model specification
}