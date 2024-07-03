import { GetAllReactionsByPostIdUseCase } from '../getAllReactionsByPostIdUseCase';
import { ReactionsRepository } from '../../interfaces/reactionsRepository';
import { Reaction } from '../../entities/reaction';
import { mock, MockProxy } from 'jest-mock-extended';

describe('GetAllReactionsByPostIdUseCase', () => {
  let getAllReactionsByPostIdUseCase: GetAllReactionsByPostIdUseCase;
  let reactionsRepository: MockProxy<ReactionsRepository>;

  beforeEach(() => {
    reactionsRepository = mock<ReactionsRepository>();
    getAllReactionsByPostIdUseCase = new GetAllReactionsByPostIdUseCase(reactionsRepository);
  });

  it('should return all reactions by post ID', async () => {
    const mockReactions: Reaction[] = [
      { id: 1, userId: 1, postId: 1, createdAt: new Date() },
      { id: 2, userId: 2, postId: 1, createdAt: new Date() },
    ];
    reactionsRepository.findAllByPostId.mockResolvedValue(mockReactions);

    const reactions = await getAllReactionsByPostIdUseCase.execute(1);

    expect(reactions).toEqual(mockReactions);
    expect(reactionsRepository.findAllByPostId).toHaveBeenCalledWith(1);
  });

  it('should throw an error if findAllByPostId fails', async () => {
    reactionsRepository.findAllByPostId.mockRejectedValue(new Error('Error'));

    await expect(getAllReactionsByPostIdUseCase.execute(1)).rejects.toThrow('Error');
  });
});
