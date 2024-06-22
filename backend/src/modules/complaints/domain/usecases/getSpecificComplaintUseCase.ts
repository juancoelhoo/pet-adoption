import { Complaint } from "../entities/complaint";
import { ComplaintsRepository } from "../interfaces/complaintsRepository";

export class GetSpecificComplaintUseCase {
  constructor(private complaintsRepository: ComplaintsRepository) {}

  async execute(id: number): Promise<Complaint> {
    const complaint = await this.complaintsRepository.findOne(id);
    if (!complaint) throw new Error("This complaint does not exist!");

    return complaint;
  }
}
