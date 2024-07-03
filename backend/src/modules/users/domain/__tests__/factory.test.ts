// src/domain/__tests__/factory.test.ts
import { SequelizeUsersRepository } from "@src/infra/services/sequelize/users/sequelizeUsersRepository";
import { getAllUsersFactory, getSpecificUserFactory, createUserFactory, updateUserFactory, deleteUserFactory } from "../../factory";
import { GetAllUsersUseCase } from "../usecases/getAllUsersUseCase";
import { GetSpecificUserUseCase } from "../usecases/getSpecificUserUseCase";
import { CreateUserUseCase } from "../usecases/createUserUseCase";
import { UpdateUserUseCase } from "../usecases/updateUserUseCase";
import { DeleteUserUseCase } from "../usecases/deleteUserUseCase";

jest.mock("@src/infra/services/sequelize/users/sequelizeUsersRepository");

describe('Factory functions', () => {
  it('getAllUsersFactory should create an instance of GetAllUsersUseCase', () => {
    const useCase = getAllUsersFactory();
    expect(useCase).toBeInstanceOf(GetAllUsersUseCase);
    // Accessing protected property for testing purposes
    expect((useCase as any).usersRepository).toBeInstanceOf(SequelizeUsersRepository);
  });

  it('getSpecificUserFactory should create an instance of GetSpecificUserUseCase', () => {
    const useCase = getSpecificUserFactory();
    expect(useCase).toBeInstanceOf(GetSpecificUserUseCase);
    // Accessing protected property for testing purposes
    expect((useCase as any).usersRepository).toBeInstanceOf(SequelizeUsersRepository);
  });

  it('createUserFactory should create an instance of CreateUserUseCase', () => {
    const useCase = createUserFactory();
    expect(useCase).toBeInstanceOf(CreateUserUseCase);
    // Accessing protected property for testing purposes
    expect((useCase as any).usersRepository).toBeInstanceOf(SequelizeUsersRepository);
  });

  it('updateUserFactory should create an instance of UpdateUserUseCase', () => {
    const useCase = updateUserFactory();
    expect(useCase).toBeInstanceOf(UpdateUserUseCase);
    // Accessing protected property for testing purposes
    expect((useCase as any).usersRepository).toBeInstanceOf(SequelizeUsersRepository);
  });

  it('deleteUserFactory should create an instance of DeleteUserUseCase', () => {
    const useCase = deleteUserFactory();
    expect(useCase).toBeInstanceOf(DeleteUserUseCase);
    // Accessing protected property for testing purposes
    expect((useCase as any).usersRepository).toBeInstanceOf(SequelizeUsersRepository);
  });
});
