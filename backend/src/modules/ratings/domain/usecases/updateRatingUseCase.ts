import { UpdateRating } from "../entities/updateRating";
import { UpdateRatingRequest } from "../entities/updateRatingRequest";
import { RatingsRepository } from "../interfaces/ratingsRepository";

export class UpdateRatingUseCase {
  constructor(private ratingsRepository: RatingsRepository) {}

  async execute(request: UpdateRatingRequest): Promise<void> {
    const rating: UpdateRating = {
      ...request,
    };

    await this.ratingsRepository.update(request.id, rating);
  }
}
