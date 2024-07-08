import { mock, MockProxy } from 'jest-mock-extended';
import { UpdateComplaintUseCase } from '../updateComplaintUseCase';
import { ComplaintsRepository } from '../../interfaces/complaintsRepository';
import { UpdateComplaintRequest } from '../../entities/updateComplaintRequest';

describe('UpdateComplaintUseCase', () => {
  let useCase: UpdateComplaintUseCase;
  let complaintsRepository: MockProxy<ComplaintsRepository>;

  beforeEach(() => {
    complaintsRepository = mock<ComplaintsRepository>();
    useCase = new UpdateComplaintUseCase(complaintsRepository);
  });

  it('should update a complaint', async () => {
    const complaintId = 1;
    const complaint: UpdateComplaintRequest = {
      reason: "Reason 1"
    };

    await useCase.execute(complaintId, complaint);

    expect(complaintsRepository.update).toHaveBeenCalledWith(complaintId, complaint);
  });
});
