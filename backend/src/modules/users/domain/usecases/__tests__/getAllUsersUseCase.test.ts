import { mock, MockProxy } from 'jest-mock-extended';
import { GetAllUsersUseCase } from '../getAllUsersUseCase';
import { UsersRepository } from '../../interfaces/usersRepository';
import { User } from '../../entities/user';

describe('GetAllUsersUseCase', () => {
  let useCase: GetAllUsersUseCase;
  let usersRepository: MockProxy<UsersRepository>;

  beforeEach(() => {
    usersRepository = mock<UsersRepository>();
    useCase = new GetAllUsersUseCase(usersRepository);
  });

  it('should return all users', async () => {
    const users: User[] = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', password: 'password123', profilePhoto: '', description: '', address: '', phone: '', permissions: 0 },
    ];
    usersRepository.findAll.mockResolvedValue(users);

    const result = await useCase.execute();

    expect(result).toEqual(users);
    expect(usersRepository.findAll).toHaveBeenCalled();
  });
});
