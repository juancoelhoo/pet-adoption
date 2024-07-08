import { CreateReactionUseCase } from '../createReactionUseCase';
import { ReactionsRepository } from '../../interfaces/reactionsRepository';
import { CreateReactionRequest } from '../../entities/createReactionRequest';
import { mock, MockProxy } from 'jest-mock-extended';

describe('CreateReactionUseCase', () => {
  let createReactionUseCase: CreateReactionUseCase;
  let reactionsRepository: MockProxy<ReactionsRepository>;

  beforeEach(() => {
    reactionsRepository = mock<ReactionsRepository>();
    createReactionUseCase = new CreateReactionUseCase(reactionsRepository);
  });

  it('should create a reaction', async () => {
    const request: CreateReactionRequest = { userId: 1, postId: 1 };

    await createReactionUseCase.execute(request);

    expect(reactionsRepository.create).toHaveBeenCalledWith(request);
  });

  it('should throw an error if create fails', async () => {
    const request: CreateReactionRequest = { userId: 1, postId: 1 };
    reactionsRepository.create.mockRejectedValue(new Error('Error'));

    await expect(createReactionUseCase.execute(request)).rejects.toThrow('Error');
  });
});
