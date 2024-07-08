import { GetAllReactionsUseCase } from '../getAllReactionsUseCase';
import { ReactionsRepository } from '../../interfaces/reactionsRepository';
import { Reaction } from '../../entities/reaction';
import { mock, MockProxy } from 'jest-mock-extended';

describe('GetAllReactionsUseCase', () => {
  let getAllReactionsUseCase: GetAllReactionsUseCase;
  let reactionsRepository: MockProxy<ReactionsRepository>;

  beforeEach(() => {
    reactionsRepository = mock<ReactionsRepository>();
    getAllReactionsUseCase = new GetAllReactionsUseCase(reactionsRepository);
  });

  it('should return all reactions', async () => {
    const mockReactions: Reaction[] = [
      { id: 1, userId: 1, postId: 1, createdAt: new Date() },
      { id: 2, userId: 2, postId: 2, createdAt: new Date() },
    ];
    reactionsRepository.findAll.mockResolvedValue(mockReactions);

    const reactions = await getAllReactionsUseCase.execute();

    expect(reactions).toEqual(mockReactions);
    expect(reactionsRepository.findAll).toHaveBeenCalled();
  });

  it('should throw an error if findAll fails', async () => {
    reactionsRepository.findAll.mockRejectedValue(new Error('Error'));

    await expect(getAllReactionsUseCase.execute()).rejects.toThrow('Error');
  });
});
