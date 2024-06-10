import { User } from "@src/modules/users/domain/entities/user";
import { UsersRepository } from "@src/modules/users/domain/interfaces/usersRepository";
import { UserModel } from "./usersModel";
import { CreateUserRequest } from "@src/modules/users/domain/entities/createUserRequest";
import { UpdateUserRequest } from "@src/modules/users/domain/entities/updateUserRequest";

export class SequelizeUsersRepository implements UsersRepository {
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
      console.log(error);
      throw new Error("Error in listing users: " + error);
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
      console.log(error);
      throw new Error("Error in listing specific user: " + error);
    }
  }

  async create(user: CreateUserRequest): Promise<void> {
    try {
      await UserModel.create({
        name: user.name,
        email: user.email,
        password: user.password,
        photo_url: user.profilePhoto,
        description: user.description,
        address: user.address,
        phone: user.phone,
        permissions: user.permissions || 0
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error in creating user: " + error);
    }
  }

  async update(id: number, user: UpdateUserRequest): Promise<void> {
    try {
      await UserModel.update(
        {
          name: user.name,
          email: user.email,
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
      console.log(error);
      throw new Error("Error in updating user: " + error);
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
      console.log(error);
      throw new Error("Error in deleting user: " + error);
    }
  }
}
