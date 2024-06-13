import { CreateUserRequest } from "../entities/createUserRequest";
import { User } from "../entities/user";
import { UpdateUserRequest } from "../entities/updateUserRequest";

export interface UsersRepository {
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User | null>;
  create(user: CreateUserRequest): Promise<void>;
  update(id: number, user: UpdateUserRequest): Promise<void>;
  delete(id: number): Promise<void>;
}
