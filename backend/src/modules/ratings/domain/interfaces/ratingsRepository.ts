import { CreateRating } from "../entities/createRating";
import { Rating } from "../entities/rating";
import { UpdateRating } from "../entities/updateRating";

export interface RatingsRepository {
  findAll(): Promise<Rating[]>;
  findOne(id: number): Promise<Rating | null>;
  create(rating: CreateRating): Promise<void>;
  update(id: number, rating: UpdateRating): Promise<void>;
  delete(id: number): Promise<void>;
  calculateUserAverageRating(userId: number): Promise<number>;
}
