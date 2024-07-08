import { GetSpecificReactionUseCase } from '../getSpecificReactionUseCase';
import { ReactionsRepository } from '../../interfaces/reactionsRepository';
import { Reaction } from '../../entities/reaction';
import { mock, MockProxy } from 'jest-mock-extended';

describe('GetSpecificReactionUseCase', () => {
  let getSpecificReactionUseCase: GetSpecificReactionUseCase;
  let reactionsRepository: MockProxy<ReactionsRepository>;

  beforeEach(() => {
    reactionsRepository = mock<ReactionsRepository>();
    getSpecificReactionUseCase = new GetSpecificReactionUseCase(reactionsRepository);
  });

  it('should return a specific reaction', async () => {
    const mockReaction: Reaction = { id: 1, userId: 1, postId: 1, createdAt: new Date() };
    reactionsRepository.findOne.mockResolvedValue(mockReaction);

    const reaction = await getSpecificReactionUseCase.execute(1);

    expect(reaction).toEqual(mockReaction);
    expect(reactionsRepository.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw an error if reaction does not exist', async () => {
    reactionsRepository.findOne.mockResolvedValue(null);

    await expect(getSpecificReactionUseCase.execute(1)).rejects.toThrow('This reaction does not exist!');
  });

  it('should throw an error if findOne fails', async () => {
    reactionsRepository.findOne.mockRejectedValue(new Error('Error'));

    await expect(getSpecificReactionUseCase.execute(1)).rejects.toThrow('Error');
  });
});
