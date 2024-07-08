import { mock, MockProxy } from 'jest-mock-extended';
import { RatingsRepository } from '../../interfaces/ratingsRepository';
import { UpdateRatingUseCase } from '../updateRatingUseCase';
import { UpdateRatingRequest } from '../../entities/updateRatingRequest';

describe('UpdateRatingUseCase', () => {
  let ratingsRepository: MockProxy<RatingsRepository>;
  let updateRatingUseCase: UpdateRatingUseCase;

  beforeEach(() => {
    ratingsRepository = mock<RatingsRepository>();
    updateRatingUseCase = new UpdateRatingUseCase(ratingsRepository);
  });

  it('should throw an error if repository fails', async () => {
    ratingsRepository.update.mockRejectedValue(new Error('Error'));

    const request: UpdateRatingRequest = { id: 1, grade: 5, reporterUserId: 1, reportedUserId: 2};

    await expect(updateRatingUseCase.execute(request)).rejects.toThrow('Error');
  });
});
