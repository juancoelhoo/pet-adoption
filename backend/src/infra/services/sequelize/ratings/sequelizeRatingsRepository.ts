import { Rating } from "@src/modules/ratings/domain/entities/rating";
import { RatingsRepository } from "@src/modules/ratings/domain/interfaces/ratingsRepository";
import { RatingModel } from "./ratingsModel";
import { CreateRating } from "@src/modules/ratings/domain/entities/createRating";
import { UpdateRating } from "@src/modules/ratings/domain/entities/updateRating";

export class SequelizeRatingsRepository implements RatingsRepository {
  async findAll(): Promise<Rating[]> {
    try {
      const ratings: RatingModel[] = await RatingModel.findAll({ order: [['created_at', 'DESC']] });
      return ratings.map(rating => ({
        id: rating.id,
        grade: rating.grade,
        reporterUserId: rating.reporter_user_id,
        reportedUserId: rating.reported_user_id,
        createdAt: rating.created_at
      }));
    } catch (error) {
      console.log(error);
      throw new Error("Error in listing ratings: " + error);
    }
  }

  async findOne(id: number): Promise<Rating | null> {
    try {
      const rating = await RatingModel.findOne({
        where: {
          id: id
        }
      });

      if (rating == null) return null;

      return {
        id: rating.id,
        grade: rating.grade,
        reporterUserId: rating.reporter_user_id,
        reportedUserId: rating.reported_user_id,
        createdAt: rating.created_at
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error in listing specific rating: " + error);
    }
  }

  async create(rating: CreateRating): Promise<void> {
    try {
      await RatingModel.create({
        grade: rating.grade,
        reporter_user_id: rating.reporterUserId,
        reported_user_id: rating.reportedUserId,
        created_at: rating.createdAt
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error in creating rating: " + error);
    }
  }

  async update(id: number, rating: UpdateRating): Promise<void> {
    try {
      await RatingModel.update(
        {
          grade: rating.grade,
          reporter_user_id: rating.reporterUserId,
          reported_user_id: rating.reportedUserId
        },
        {
          where: {
            id: id
          }
        }
      );
    } catch (error) {
      console.log(error);
      throw new Error("Error in updating rating: " + error);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await RatingModel.destroy({
        where: {
          id: id
        }
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error in deleting rating: " + error);
    }
  }

  async calculateUserAverageRating(userId: number): Promise<number> {
    try {
      const ratings = await RatingModel.findAll({
        where: {
          reported_user_id: userId
        }
      });

      if (ratings.length === 0) return 0;

      const total = ratings.reduce((sum, rating) => sum + rating.grade, 0);
      return total / ratings.length;
    } catch (error) {
      console.log(error);
      throw new Error("Error in calculating average rating: " + error);
    }
  }
}
