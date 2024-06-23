import { CreateRating } from "../entities/createRating";
import { CreateRatingRequest } from "../entities/createRatingRequest";
import { RatingsRepository } from "../interfaces/ratingsRepository";

export class CreateRatingUseCase {
  constructor(private ratingsRepository: RatingsRepository) {}

  async execute(request: CreateRatingRequest): Promise<void> {
    const rating: CreateRating = {
      ...request,
      createdAt: new Date(request.createdAt)
    };

    await this.ratingsRepository.create(rating);
  }
}
