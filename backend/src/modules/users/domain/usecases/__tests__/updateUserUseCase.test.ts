import { mock, MockProxy } from 'jest-mock-extended';
import { UpdateUserUseCase } from '../updateUserUseCase';
import { UsersRepository } from '../../interfaces/usersRepository';
import { UpdateUser } from '../../entities/updateUser';

describe('UpdateUserUseCase', () => {
  let useCase: UpdateUserUseCase;
  let usersRepository: MockProxy<UsersRepository>;

  beforeEach(() => {
    usersRepository = mock<UsersRepository>();
    useCase = new UpdateUserUseCase(usersRepository);
  });

  it('should update a user', async () => {
    const userId = 1;
    const user: Omit<UpdateUser, 'id' | 'email'> = { name: 'John Doe Updated', password: 'newpassword123', profilePhoto: 'newPhotoUrl', description: 'new description', address: 'new address', phone: 'new phone', permissions: 1 };

    await useCase.execute(userId, user);

    expect(usersRepository.update).toHaveBeenCalledWith(userId, user);
  });
});
