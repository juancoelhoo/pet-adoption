import { mock, MockProxy } from 'jest-mock-extended';
import { RatingsRepository } from '../../interfaces/ratingsRepository';
import { GetAllRatingsUseCase } from '../getAllRatingsUseCase';
import { Rating } from '../../entities/rating';

describe('GetAllRatingsUseCase', () => {
  let ratingsRepository: MockProxy<RatingsRepository>;
  let getAllRatingsUseCase: GetAllRatingsUseCase;

  beforeEach(() => {
    ratingsRepository = mock<RatingsRepository>();
    getAllRatingsUseCase = new GetAllRatingsUseCase(ratingsRepository);
  });

  it('should return all ratings', async () => {
    const ratings: Rating[] = [{ id: 1, grade: 5, reporterUserId: 1, reportedUserId: 2, createdAt: new Date() }];
    ratingsRepository.findAll.mockResolvedValue(ratings);

    const result = await getAllRatingsUseCase.execute();

    expect(result).toEqual(ratings);
    expect(ratingsRepository.findAll).toHaveBeenCalled();
  });

  it('should throw an error if repository fails', async () => {
    ratingsRepository.findAll.mockRejectedValue(new Error('Error'));

    await expect(getAllRatingsUseCase.execute()).rejects.toThrow('Error');
  });
});
