import { SequelizeUsersRepository } from "@src/infra/services/sequelize/users/sequelizeUsersRepository";

import { GetAllUsersUseCase } from "./domain/usecases/getAllUsersUseCase";
import { GetSpecificUserUseCase } from "./domain/usecases/getSpecificUserUseCase";
import { CreateUserUseCase } from "./domain/usecases/createUserUseCase";
import { UpdateUserUseCase } from "./domain/usecases/updateUserUseCase";
import { DeleteUserUseCase } from "./domain/usecases/deleteUserUseCase";

const usersRepository = new SequelizeUsersRepository();

export const getAllUsersFactory = () => {
  return new GetAllUsersUseCase(usersRepository);
};

export const getSpecificUserFactory = () => {
  return new GetSpecificUserUseCase(usersRepository);
};

export const createUserFactory = () => {
  return new CreateUserUseCase(usersRepository);
};

export const updateUserFactory = () => {
  return new UpdateUserUseCase(usersRepository);
};

export const deleteUserFactory = () => {
  return new DeleteUserUseCase(usersRepository);
};
