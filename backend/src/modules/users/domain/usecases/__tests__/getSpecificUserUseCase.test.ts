import { mock, MockProxy } from 'jest-mock-extended';
import { GetSpecificUserUseCase } from '../getSpecificUserUseCase';
import { UsersRepository } from '../../interfaces/usersRepository';
import { User } from '../../entities/user';

describe('GetSpecificUserUseCase', () => {
  let useCase: GetSpecificUserUseCase;
  let usersRepository: MockProxy<UsersRepository>;

  beforeEach(() => {
    usersRepository = mock<UsersRepository>();
    useCase = new GetSpecificUserUseCase(usersRepository);
  });

  it('should return the specific user if found', async () => {
    const userId = 1;
    const user: User = { id: userId, name: 'John Doe', email: 'john.doe@example.com', password: 'password123', profilePhoto: '', description: '', address: '', phone: '', permissions: 0 };
    usersRepository.findOne.mockResolvedValue(user);

    const result = await useCase.execute(userId);

    expect(result).toEqual(user);
    expect(usersRepository.findOne).toHaveBeenCalledWith(userId);
  });

  it('should throw an error if the user is not found', async () => {
    const userId = 1;
    usersRepository.findOne.mockResolvedValue(null);

    await expect(useCase.execute(userId)).rejects.toThrow('This user does not exist!');
  });
});
