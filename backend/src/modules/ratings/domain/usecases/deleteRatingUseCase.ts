import { RatingsRepository } from "../interfaces/ratingsRepository";

export class DeleteRatingUseCase {
  constructor(private ratingsRepository: RatingsRepository) {}

  async execute(id: number): Promise<void> {
    // TODO: Add verification if it is not in use

    await this.ratingsRepository.delete(id);
  }
}
