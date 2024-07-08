import { mock, MockProxy } from 'jest-mock-extended';
import { CreateUserUseCase } from '../createUserUseCase';
import { UsersRepository } from '../../interfaces/usersRepository';
import { CreateUserRequest } from '../../entities/createUserRequest';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let usersRepository: MockProxy<UsersRepository>;

  beforeEach(() => {
    usersRepository = mock<UsersRepository>();
    useCase = new CreateUserUseCase(usersRepository);
  });

  it('should create a new user with default values', async () => {
    const request: CreateUserRequest = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    await useCase.execute(request);

    expect(usersRepository.create).toHaveBeenCalledWith({
      ...request,
      permissions: 0,
      address: "Edite seu endereço",
      profilePhoto: "https://i.imgur.com/tmUa2ir.png",
      phone: "Edite seu numero de celular",
      description: "Edite sua descrição",
    });
  });
});
