import { mock, MockProxy } from 'jest-mock-extended';
import RatingsController from '../controller';
import { Request, Response, NextFunction } from 'express';
import { createRatingFactory, deleteRatingFactory, getAllRatingsFactory, getSpecificRatingFactory, updateRatingFactory, calculateUserAverageRatingFactory } from '@src/modules/ratings/factory';
import { CreateRatingRequest } from '@src/modules/ratings/domain/entities/createRatingRequest';
import { UpdateRatingRequest } from '@src/modules/ratings/domain/entities/updateRatingRequest';
import { InvalidParamError } from '@src/infra/api/errors/InvalidParamError';

jest.mock('@src/modules/ratings/factory');

describe('RatingsController', () => {
  let req: MockProxy<Request>;
  let res: MockProxy<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = mock<Request>();
    res = mock<Response>();
    next = jest.fn();
    res.status.mockReturnThis();
    res.json.mockReturnThis();
  });

  describe('getAll', () => {
    it('should return all ratings', async () => {
      const executeMock = jest.fn().mockResolvedValue([]);
      (getAllRatingsFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await RatingsController.getAll(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Ratings listed successfully!', body: [] });
    });

    it('should call next for errors', async () => {
      const error = new Error('Error');
      const executeMock = jest.fn().mockRejectedValue(error);
      (getAllRatingsFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await RatingsController.getAll(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getOne', () => {
    it('should return a specific rating', async () => {
      req.params.id = '1';
      const executeMock = jest.fn().mockResolvedValue({});
      (getSpecificRatingFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await RatingsController.getOne(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Rating listed successfully!', body: {} });
    });

    it('should return 404 if rating not found', async () => {
      req.params.id = '1';
      const executeMock = jest.fn().mockResolvedValue(null);
      (getSpecificRatingFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await RatingsController.getOne(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Rating not found!' });
    });

    it('should return 400 if id is missing', async () => {
      req.params.id = '';
      await RatingsController.getOne(req, res, next);

      expect(next).toHaveBeenCalledWith(new InvalidParamError("Missing property 'id'!"));
    });

    it('should call next for errors', async () => {
      req.params.id = '1';
      const error = new Error('Error');
      const executeMock = jest.fn().mockRejectedValue(error);
      (getSpecificRatingFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await RatingsController.getOne(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('create', () => {
    it('should create a new rating', async () => {
      req.body = { userId: 1, postId: 1, rating: 5, grade: 3, reporterUserId: 2, reportedUserId: 3, createdAt: new Date().toISOString() } as CreateRatingRequest;
      const executeMock = jest.fn().mockResolvedValue({});
      (createRatingFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await RatingsController.create(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Rating created successfully!' });
    });

    it('should call next on error', async () => {
      req.body = { userId: 1, postId: 1, rating: 5, grade: 3, reporterUserId: 2, reportedUserId: 3, createdAt: new Date().toISOString() } as CreateRatingRequest;
      const error = new Error('Error');
      const executeMock = jest.fn().mockRejectedValue(error);
      (createRatingFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await RatingsController.create(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('update', () => {
    it('should update an existing rating', async () => {
      req.params.id = '1';
      req.body = { id: 1, postId: 1, rating: 5, grade: 3, reporterUserId: 2, reportedUserId: 3, createdAt: new Date().toISOString() } as UpdateRatingRequest;
      const getMock = jest.fn().mockResolvedValue({});
      const updateMock = jest.fn().mockResolvedValue({});
      (getSpecificRatingFactory as jest.Mock).mockReturnValue({ execute: getMock });
      (updateRatingFactory as jest.Mock).mockReturnValue({ execute: updateMock });

      await RatingsController.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Rating updated successfully!' });
    });

    it('should return 404 if rating not found', async () => {
      req.params.id = '1';
      req.body = { id: 1, postId: 1, rating: 5, grade: 3, reporterUserId: 2, reportedUserId: 3, createdAt: new Date().toISOString() } as UpdateRatingRequest;
      const getMock = jest.fn().mockResolvedValue(null);
      const updateMock = jest.fn();
      (getSpecificRatingFactory as jest.Mock).mockReturnValue({ execute: getMock });
      (updateRatingFactory as jest.Mock).mockReturnValue({ execute: updateMock });

      await RatingsController.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Rating not found!' });
      expect(updateMock).not.toHaveBeenCalled();
    });

    it('should call next on error', async () => {
      req.params.id = '1';
      req.body = { id: 1, postId: 1, rating: 5, grade: 3, reporterUserId: 2, reportedUserId: 3, createdAt: new Date().toISOString() } as UpdateRatingRequest;
      const error = new Error('Error');
      const getMock = jest.fn().mockRejectedValue(error);
      (getSpecificRatingFactory as jest.Mock).mockReturnValue({ execute: getMock });

      await RatingsController.update(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    it('should return 400 if id is missing', async () => {
      req.params.id = '';
      await RatingsController.update(req, res, next);

      expect(next).toHaveBeenCalledWith(new InvalidParamError("Missing property 'id'!"));
    });
  });

  describe('delete', () => {
    it('should delete a rating', async () => {
      req.params.id = '1';
      const getMock = jest.fn().mockResolvedValue({});
      const deleteMock = jest.fn().mockResolvedValue({});
      (getSpecificRatingFactory as jest.Mock).mockReturnValue({ execute: getMock });
      (deleteRatingFactory as jest.Mock).mockReturnValue({ execute: deleteMock });

      await RatingsController.delete(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Rating deleted successfully!' });
    });

    it('should return 404 if rating not found', async () => {
      req.params.id = '1';
      const getMock = jest.fn().mockResolvedValue(null);
      const deleteMock = jest.fn();
      (getSpecificRatingFactory as jest.Mock).mockReturnValue({ execute: getMock });
      (deleteRatingFactory as jest.Mock).mockReturnValue({ execute: deleteMock });

      await RatingsController.delete(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Rating not found!' });
      expect(deleteMock).not.toHaveBeenCalled();
    });

    it('should call next on error', async () => {
      req.params.id = '1';
      const error = new Error('Error');
      const getMock = jest.fn().mockRejectedValue(error);
      (getSpecificRatingFactory as jest.Mock).mockReturnValue({ execute: getMock });

      await RatingsController.delete(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    it('should return 400 if id is missing', async () => {
      req.params.id = '';
      await RatingsController.delete(req, res, next);

      expect(next).toHaveBeenCalledWith(new InvalidParamError("Missing property 'id'!"));
    });
  });

  describe('calculateAverage', () => {
    it('should calculate average rating for a user', async () => {
      req.params.userId = '1';
      const executeMock = jest.fn().mockResolvedValue(4.5);
      (calculateUserAverageRatingFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await RatingsController.calculateAverage(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User average rating calculated successfully!',
        body: { average: 5 },
      });
    });

    it('should call next on error', async () => {
      req.params.userId = '1';
      const error = new Error('Error');
      const executeMock = jest.fn().mockRejectedValue(error);
      (calculateUserAverageRatingFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await RatingsController.calculateAverage(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    it('should return 400 if userId is missing', async () => {
      req.params.userId = '';
      await RatingsController.calculateAverage(req, res, next);

      expect(next).toHaveBeenCalledWith(new InvalidParamError("Missing property 'userId'!"));
    });
  });
});
