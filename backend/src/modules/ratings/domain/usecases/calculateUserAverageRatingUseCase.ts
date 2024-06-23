import { RatingsRepository } from "../interfaces/ratingsRepository";

export class CalculateUserAverageRatingUseCase {
  constructor(private ratingsRepository: RatingsRepository) {}

  async execute(userId: number): Promise<number> {
    return await this.ratingsRepository.calculateUserAverageRating(userId);
  }
}
