import { mock, MockProxy } from 'jest-mock-extended';
import { CreateComplaintUseCase } from '../createComplaintUseCase';
import { ComplaintsRepository } from '../../interfaces/complaintsRepository';
import { CreateComplaintRequest } from '../../entities/createComplaintRequest';

describe('CreateComplaintUseCase', () => {
  let useCase: CreateComplaintUseCase;
  let complaintsRepository: MockProxy<ComplaintsRepository>;

  beforeEach(() => {
    complaintsRepository = mock<ComplaintsRepository>();
    useCase = new CreateComplaintUseCase(complaintsRepository);
  });

  it('should create a new complaint', async () => {
    const request: CreateComplaintRequest = {
      reporterUserId: 1,
      reportedPostId: 2
    };

    await useCase.execute(request);

    expect(complaintsRepository.create).toHaveBeenCalledWith(request);
  });
});
