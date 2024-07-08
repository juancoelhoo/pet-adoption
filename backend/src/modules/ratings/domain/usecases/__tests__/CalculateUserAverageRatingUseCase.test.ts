import { mock, MockProxy } from 'jest-mock-extended';
import { RatingsRepository } from '../../interfaces/ratingsRepository';
import { CalculateUserAverageRatingUseCase } from '../calculateUserAverageRatingUseCase';

describe('CalculateUserAverageRatingUseCase', () => {
  let ratingsRepository: MockProxy<RatingsRepository>;
  let calculateUserAverageRatingUseCase: CalculateUserAverageRatingUseCase;

  beforeEach(() => {
    ratingsRepository = mock<RatingsRepository>();
    calculateUserAverageRatingUseCase = new CalculateUserAverageRatingUseCase(ratingsRepository);
  });

  it('should calculate average rating for a user', async () => {
    ratingsRepository.calculateUserAverageRating.mockResolvedValue(4.5);

    const result = await calculateUserAverageRatingUseCase.execute(1);

    expect(result).toBe(4.5);
    expect(ratingsRepository.calculateUserAverageRating).toHaveBeenCalledWith(1);
  });

  it('should throw an error if repository fails', async () => {
    ratingsRepository.calculateUserAverageRating.mockRejectedValue(new Error('Error'));

    await expect(calculateUserAverageRatingUseCase.execute(1)).rejects.toThrow('Error');
  });
});
