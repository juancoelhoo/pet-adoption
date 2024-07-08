import { mock, MockProxy } from 'jest-mock-extended';
import { RatingsRepository } from '../../interfaces/ratingsRepository';
import { DeleteRatingUseCase } from '../deleteRatingUseCase';

describe('DeleteRatingUseCase', () => {
  let ratingsRepository: MockProxy<RatingsRepository>;
  let deleteRatingUseCase: DeleteRatingUseCase;

  beforeEach(() => {
    ratingsRepository = mock<RatingsRepository>();
    deleteRatingUseCase = new DeleteRatingUseCase(ratingsRepository);
  });

  it('should delete a rating', async () => {
    await deleteRatingUseCase.execute(1);

    expect(ratingsRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw an error if repository fails', async () => {
    ratingsRepository.delete.mockRejectedValue(new Error('Error'));

    await expect(deleteRatingUseCase.execute(1)).rejects.toThrow('Error');
  });
});
