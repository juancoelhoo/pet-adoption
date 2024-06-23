import { Rating } from "../entities/rating";
import { RatingsRepository } from "../interfaces/ratingsRepository";

export class GetAllRatingsUseCase {
  constructor(private ratingsRepository: RatingsRepository) {}

  async execute(): Promise<Rating[]> {
    return await this.ratingsRepository.findAll();
  }
}
