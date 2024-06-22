import { CreateComplaintRequest } from "../entities/createComplaintRequest";
import { ComplaintsRepository } from "../interfaces/complaintsRepository";

export class CreateComplaintUseCase {
  constructor(private complaintsRepository: ComplaintsRepository) {}

  async execute(request: CreateComplaintRequest): Promise<void> {
    await this.complaintsRepository.create(request);
  }
}
