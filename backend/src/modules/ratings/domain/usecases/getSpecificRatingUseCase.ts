import { Rating } from "../entities/rating";
import { RatingsRepository } from "../interfaces/ratingsRepository";

export class GetSpecificRatingUseCase {
  constructor(private ratingsRepository: RatingsRepository) {}

  async execute(id: number): Promise<Rating> {
    const rating = await this.ratingsRepository.findOne(id);
    if (!rating) throw new Error("This rating does not exist!");

    return rating;
  }
}
