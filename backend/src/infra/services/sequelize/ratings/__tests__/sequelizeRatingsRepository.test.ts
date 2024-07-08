import { SequelizeRatingsRepository } from '@src/infra/services/sequelize/ratings/sequelizeRatingsRepository';
import { RatingModel } from '@src/infra/services/sequelize/ratings/ratingsModel';
import { CreateRating } from '@src/modules/ratings/domain/entities/createRating';
import { UpdateRating } from '@src/modules/ratings/domain/entities/updateRating';
import { Rating } from '@src/modules/ratings/domain/entities/rating';

jest.mock('@src/infra/services/sequelize/ratings/ratingsModel');

describe('SequelizeRatingsRepository', () => {
  let repository: SequelizeRatingsRepository;

  beforeEach(() => {
    repository = new SequelizeRatingsRepository();
  });

  describe('findAll', () => {
    it('should return all ratings', async () => {
      const mockRatings = [
        { id: 1, grade: 5, reporter_user_id: 1, reported_user_id: 2, created_at: new Date() },
        { id: 2, grade: 4, reporter_user_id: 3, reported_user_id: 4, created_at: new Date() },
      ];
      (RatingModel.findAll as jest.Mock).mockResolvedValue(mockRatings);

      const ratings = await repository.findAll();

      expect(ratings).toEqual([
        { id: 1, grade: 5, reporterUserId: 1, reportedUserId: 2, createdAt: mockRatings[0].created_at },
        { id: 2, grade: 4, reporterUserId: 3, reportedUserId: 4, createdAt: mockRatings[1].created_at },
      ]);
    });

    it('should throw an error on failure', async () => {
      (RatingModel.findAll as jest.Mock).mockRejectedValue(new Error('Error'));

      await expect(repository.findAll()).rejects.toThrow('Error in listing ratings: Error');
    });
  });

  describe('findOne', () => {
    it('should return a specific rating', async () => {
      const mockRating = { id: 1, grade: 5, reporter_user_id: 1, reported_user_id: 2, created_at: new Date() };
      (RatingModel.findOne as jest.Mock).mockResolvedValue(mockRating);

      const rating = await repository.findOne(1);

      expect(rating).toEqual({ id: 1, grade: 5, reporterUserId: 1, reportedUserId: 2, createdAt: mockRating.created_at });
    });

    it('should return null if rating not found', async () => {
      (RatingModel.findOne as jest.Mock).mockResolvedValue(null);

      const rating = await repository.findOne(1);

      expect(rating).toBeNull();
    });

    it('should throw an error on failure', async () => {
      (RatingModel.findOne as jest.Mock).mockRejectedValue(new Error('Error'));

      await expect(repository.findOne(1)).rejects.toThrow('Error in listing specific rating: Error');
    });
  });

  describe('create', () => {
    it('should create a new rating', async () => {
      const createRating: CreateRating = { grade: 5, reporterUserId: 1, reportedUserId: 2, createdAt: new Date() };

      await repository.create(createRating);

      expect(RatingModel.create).toHaveBeenCalledWith({
        grade: createRating.grade,
        reporter_user_id: createRating.reporterUserId,
        reported_user_id: createRating.reportedUserId,
        created_at: createRating.createdAt
      });
    });

    it('should throw an error on failure', async () => {
      (RatingModel.create as jest.Mock).mockRejectedValue(new Error('Error'));

      await expect(repository.create({ grade: 5, reporterUserId: 1, reportedUserId: 2, createdAt: new Date() })).rejects.toThrow('Error in creating rating: Error');
    });
  });

  describe('update', () => {
    it('should update an existing rating', async () => {
      const updateRating: UpdateRating = { grade: 5, reporterUserId: 1, reportedUserId: 2 };

      await repository.update(1, updateRating);

      expect(RatingModel.update).toHaveBeenCalledWith(
        {
          grade: updateRating.grade,
          reporter_user_id: updateRating.reporterUserId,
          reported_user_id: updateRating.reportedUserId
        },
        {
          where: {
            id: 1
          }
        }
      );
    });

    it('should throw an error on failure', async () => {
      (RatingModel.update as jest.Mock).mockRejectedValue(new Error('Error'));

      await expect(repository.update(1, { grade: 5, reporterUserId: 1, reportedUserId: 2 })).rejects.toThrow('Error in updating rating: Error');
    });
  });

  describe('delete', () => {
    it('should delete a rating', async () => {
      (RatingModel.destroy as jest.Mock).mockResolvedValue(1);

      await repository.delete(1);

      expect(RatingModel.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw an error on failure', async () => {
      (RatingModel.destroy as jest.Mock).mockRejectedValue(new Error('Error'));

      await expect(repository.delete(1)).rejects.toThrow('Error in deleting rating: Error');
    });
  });

  describe('calculateUserAverageRating', () => {
    it('should calculate the average rating for a user', async () => {
      const mockRatings = [
        { id: 1, grade: 5, reporter_user_id: 1, reported_user_id: 2, created_at: new Date() },
        { id: 2, grade: 4, reporter_user_id: 3, reported_user_id: 2, created_at: new Date() },
      ];
      (RatingModel.findAll as jest.Mock).mockResolvedValue(mockRatings);

      const average = await repository.calculateUserAverageRating(2);

      expect(average).toBe(4.5);
    });

    it('should return 0 if no ratings found', async () => {
      (RatingModel.findAll as jest.Mock).mockResolvedValue([]);

      const average = await repository.calculateUserAverageRating(2);

      expect(average).toBe(0);
    });

    it('should throw an error on failure', async () => {
      (RatingModel.findAll as jest.Mock).mockRejectedValue(new Error('Error'));

      await expect(repository.calculateUserAverageRating(2)).rejects.toThrow('Error in calculating average rating: Error');
    });
  });
});
