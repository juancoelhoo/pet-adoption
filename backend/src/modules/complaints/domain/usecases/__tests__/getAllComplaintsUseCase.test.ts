import { mock, MockProxy } from 'jest-mock-extended';
import { GetAllComplaintsUseCase } from '../getAllComplaintsUseCase';
import { ComplaintsRepository } from '../../interfaces/complaintsRepository';
import { Complaint } from '../../entities/complaint';

describe('GetAllComplaintsUseCase', () => {
  let useCase: GetAllComplaintsUseCase;
  let complaintsRepository: MockProxy<ComplaintsRepository>;

  beforeEach(() => {
    complaintsRepository = mock<ComplaintsRepository>();
    useCase = new GetAllComplaintsUseCase(complaintsRepository);
  });

  it('should return all complaints', async () => {
    const complaints: Complaint[] = [
      {
        id: 1,
        reporterUserId: 1,
        reportedPostId: 2,
        createdAt: new Date()
      },
    ];
    complaintsRepository.findAll.mockResolvedValue(complaints);

    const result = await useCase.execute();

    expect(result).toEqual(complaints);
    expect(complaintsRepository.findAll).toHaveBeenCalled();
  });
});
