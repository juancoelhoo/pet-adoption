import { mock, MockProxy } from 'jest-mock-extended';
import { RatingsRepository } from '../../interfaces/ratingsRepository';
import { CreateRatingUseCase } from '../createRatingUseCase';
import { CreateRatingRequest } from '../../entities/createRatingRequest';

describe('CreateRatingUseCase', () => {
  let ratingsRepository: MockProxy<RatingsRepository>;
  let createRatingUseCase: CreateRatingUseCase;

  beforeEach(() => {
    ratingsRepository = mock<RatingsRepository>();
    createRatingUseCase = new CreateRatingUseCase(ratingsRepository);
  });

  it('should create a new rating', async () => {
    const request: CreateRatingRequest = { grade: 5, reporterUserId: 1, reportedUserId: 2, createdAt: new Date().toISOString() };

    await createRatingUseCase.execute(request);

    expect(ratingsRepository.create).toHaveBeenCalledWith({
      ...request,
      createdAt: new Date(request.createdAt),
    });
  });

  it('should throw an error if repository fails', async () => {
    ratingsRepository.create.mockRejectedValue(new Error('Error'));

    const request: CreateRatingRequest = { grade: 5, reporterUserId: 1, reportedUserId: 2, createdAt: new Date().toISOString() };

    await expect(createRatingUseCase.execute(request)).rejects.toThrow('Error');
  });
});
