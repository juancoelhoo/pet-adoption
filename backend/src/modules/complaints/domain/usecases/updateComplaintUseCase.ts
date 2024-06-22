import { ComplaintsRepository } from "../interfaces/complaintsRepository";
import { UpdateComplaintRequest } from "../entities/updateComplaintRequest";

export class UpdateComplaintUseCase {
  constructor(private complaintsRepository: ComplaintsRepository) {}

  async execute(id: number, complaint: UpdateComplaintRequest): Promise<void> {
    await this.complaintsRepository.update(id, complaint);
  }
}
