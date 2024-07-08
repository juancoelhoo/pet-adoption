import { mock, MockProxy } from 'jest-mock-extended';
import { DeleteUserUseCase } from '../deleteUserUseCase';
import { UsersRepository } from '../../interfaces/usersRepository';

describe('DeleteUserUseCase', () => {
  let useCase: DeleteUserUseCase;
  let usersRepository: MockProxy<UsersRepository>;

  beforeEach(() => {
    usersRepository = mock<UsersRepository>();
    useCase = new DeleteUserUseCase(usersRepository);
  });

  it('should delete a user by id', async () => {
    const userId = 1;

    await useCase.execute(userId);

    expect(usersRepository.delete).toHaveBeenCalledWith(userId);
  });
});
