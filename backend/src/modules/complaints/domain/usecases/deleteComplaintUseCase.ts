import { ComplaintsRepository } from "../interfaces/complaintsRepository";

export class DeleteComplaintUseCase {
  constructor(private complaintsRepository: ComplaintsRepository) {}

  async execute(id: number): Promise<void> {
    await this.complaintsRepository.delete(id);
  }
}
