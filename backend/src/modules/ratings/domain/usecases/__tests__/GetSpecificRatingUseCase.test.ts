import { mock, MockProxy } from 'jest-mock-extended';
import { RatingsRepository } from '../../interfaces/ratingsRepository';
import { GetSpecificRatingUseCase } from '../getSpecificRatingUseCase';
import { Rating } from '../../entities/rating';

describe('GetSpecificRatingUseCase', () => {
  let ratingsRepository: MockProxy<RatingsRepository>;
  let getSpecificRatingUseCase: GetSpecificRatingUseCase;

  beforeEach(() => {
    ratingsRepository = mock<RatingsRepository>();
    getSpecificRatingUseCase = new GetSpecificRatingUseCase(ratingsRepository);
  });

  it('should return a specific rating', async () => {
    const rating: Rating = { id: 1, grade: 5, reporterUserId: 1, reportedUserId: 2, createdAt: new Date() };
    ratingsRepository.findOne.mockResolvedValue(rating);

    const result = await getSpecificRatingUseCase.execute(1);

    expect(result).toEqual(rating);
    expect(ratingsRepository.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw an error if rating not found', async () => {
    ratingsRepository.findOne.mockResolvedValue(null);

    await expect(getSpecificRatingUseCase.execute(1)).rejects.toThrow('This rating does not exist!');
  });

  it('should throw an error if repository fails', async () => {
    ratingsRepository.findOne.mockRejectedValue(new Error('Error'));

    await expect(getSpecificRatingUseCase.execute(1)).rejects.toThrow('Error');
  });
});
