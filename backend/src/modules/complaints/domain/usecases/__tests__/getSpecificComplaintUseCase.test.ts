import { mock, MockProxy } from 'jest-mock-extended';
import { GetSpecificComplaintUseCase } from '../getSpecificComplaintUseCase';
import { ComplaintsRepository } from '../../interfaces/complaintsRepository';
import { Complaint } from '../../entities/complaint';

describe('GetSpecificComplaintUseCase', () => {
  let useCase: GetSpecificComplaintUseCase;
  let complaintsRepository: MockProxy<ComplaintsRepository>;

  beforeEach(() => {
    complaintsRepository = mock<ComplaintsRepository>();
    useCase = new GetSpecificComplaintUseCase(complaintsRepository);
  });

  it('should return the specific complaint if found', async () => {
    const complaintId = 1;
    const complaint: Complaint = {
      id: 1,
      createdAt: new Date(),
      reporterUserId: 1,
      reportedPostId: 2
    };
    complaintsRepository.findOne.mockResolvedValue(complaint);

    const result = await useCase.execute(complaintId);

    expect(result).toEqual(complaint);
    expect(complaintsRepository.findOne).toHaveBeenCalledWith(complaintId);
  });

  it('should throw an error if the complaint is not found', async () => {
    const complaintId = 1;
    complaintsRepository.findOne.mockResolvedValue(null);

    await expect(useCase.execute(complaintId)).rejects.toThrow('This complaint does not exist!');
  });
});
