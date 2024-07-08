import { mock, MockProxy } from 'jest-mock-extended';
import { DeleteComplaintUseCase } from '../deleteComplaintUseCase';
import { ComplaintsRepository } from '../../interfaces/complaintsRepository';

describe('DeleteComplaintUseCase', () => {
  let useCase: DeleteComplaintUseCase;
  let complaintsRepository: MockProxy<ComplaintsRepository>;

  beforeEach(() => {
    complaintsRepository = mock<ComplaintsRepository>();
    useCase = new DeleteComplaintUseCase(complaintsRepository);
  });

  it('should delete a complaint by id', async () => {
    const complaintId = 1;

    await useCase.execute(complaintId);

    expect(complaintsRepository.delete).toHaveBeenCalledWith(complaintId);
  });
});
