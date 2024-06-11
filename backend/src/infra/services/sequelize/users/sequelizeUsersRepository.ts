import { User } from "@src/modules/users/domain/entities/user";
import { UsersRepository } from "@src/modules/users/domain/interfaces/usersRepository";
import { UserModel } from "./usersModel";
import { CreateUserRequest } from "@src/modules/users/domain/entities/createUserRequest";
import { UpdateUserRequest } from "@src/modules/users/domain/entities/updateUserRequest";
import { InvalidParamError } from "@src/infra/api/errors/InvalidParamError";
import { QueryError } from "@src/infra/api/errors/QueryError";
import bcrypt from 'bcrypt';

export class SequelizeUsersRepository implements UsersRepository {
  async encryptPassword(password: string){
    const saltRounds = 10; 
    const encryped = bcrypt.hash(password, saltRounds);
    return encryped;
  }

  async findAll(): Promise<User[]> {
    try {
      const users: UserModel[] = await UserModel.findAll();
      return users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        profilePhoto: user.photo_url,
        description: user.description,
        address: user.address,
        phone: user.phone,
        permissions: user.permissions
      }));
    } catch (error) {
      if (error instanceof Error) {
        throw new QueryError("Error in listing users: " + error.message);
      } else {
        throw new QueryError("Unknown error in listing users");
      }
    }
  }

  async findOne(id: number): Promise<User | null> {
    try {
      const user = await UserModel.findOne({
        where: {
          id: id
        }
      });

      if (user == null) return null;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        profilePhoto: user.photo_url,
        description: user.description,
        address: user.address,
        phone: user.phone,
        permissions: user.permissions
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new QueryError("Error in listing specific user: " + error.message);
      } else {
        throw new QueryError("Unknown error in listing specific user");
      }
    }
  }

  async create(user: CreateUserRequest): Promise<void> {
    try {
      const encryptedPassword = await this.encryptPassword(user.password);
      await UserModel.create({
        name: user.name,
        email: user.email,
        password: encryptedPassword,
        photo_url: user.profilePhoto,
        description: user.description,
        address: user.address,
        phone: user.phone,
        permissions: user.permissions || 0
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new QueryError("Error in creating user: " + error.message);
      } else {
        throw new QueryError("Unknown error in creating user");
      }
    }
  }
  
  async update(id: number, user: Omit<UpdateUserRequest, 'id' | 'email'>): Promise<void> {
    try {
      await UserModel.update(
        {
          name: user.name,
          password: user.password,
          photo_url: user.profilePhoto,
          description: user.description,
          address: user.address,
          phone: user.phone,
          permissions: user.permissions
        },
        {
          where: {
            id: id
          }
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new QueryError("Error in updating user: " + error.message);
      } else {
        throw new QueryError("Unknown error in updating user");
      }
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await UserModel.destroy({
        where: {
          id: id
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new QueryError("Error in deleting user: " + error.message);
      } else {
        throw new QueryError("Unknown error in deleting user");
      }
    }
  }
}