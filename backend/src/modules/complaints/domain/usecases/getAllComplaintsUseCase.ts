import { Complaint } from "../entities/complaint";
import { ComplaintsRepository } from "../interfaces/complaintsRepository";

export class GetAllComplaintsUseCase {
  constructor(private complaintsRepository: ComplaintsRepository) {}

  async execute(): Promise<Complaint[]> {
    return await this.complaintsRepository.findAll();
  }
}
