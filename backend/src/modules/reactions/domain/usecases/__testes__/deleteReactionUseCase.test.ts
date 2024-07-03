import { DeleteReactionUseCase } from '../deleteReactionUseCase';
import { ReactionsRepository } from '../../interfaces/reactionsRepository';
import { mock, MockProxy } from 'jest-mock-extended';

describe('DeleteReactionUseCase', () => {
  let deleteReactionUseCase: DeleteReactionUseCase;
  let reactionsRepository: MockProxy<ReactionsRepository>;

  beforeEach(() => {
    reactionsRepository = mock<ReactionsRepository>();
    deleteReactionUseCase = new DeleteReactionUseCase(reactionsRepository);
  });

  it('should delete a reaction', async () => {
    await deleteReactionUseCase.execute(1);

    expect(reactionsRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw an error if delete fails', async () => {
    reactionsRepository.delete.mockRejectedValue(new Error('Error'));

    await expect(deleteReactionUseCase.execute(1)).rejects.toThrow('Error');
  });
});
