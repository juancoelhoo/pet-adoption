import { mock, MockProxy } from 'jest-mock-extended';
import ReactionsController from '../controller';
import { Request, Response, NextFunction } from 'express';
import { InvalidParamError } from '@src/infra/api/errors/InvalidParamError';
import { createReactionFactory, deleteReactionFactory, getAllReactionsFactory, getSpecificReactionFactory, getAllReactionsByPostIdFactory } from '@src/modules/reactions/factory';
import { SequelizeReactionsRepository } from '@src/infra/services/sequelize/reactions/sequelizeReactionsRepository';
import { QueryError } from '@src/infra/api/errors/QueryError';

jest.mock('@src/modules/reactions/factory');
jest.mock('@src/infra/services/sequelize/reactions/sequelizeReactionsRepository');

interface Reaction {
  id: number;
  userId: number;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
}

describe('ReactionsController', () => {
  let req: MockProxy<Request>;
  let res: MockProxy<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = mock<Request>();
    res = mock<Response>();
    next = jest.fn();
    res.status.mockReturnValue(res);
    res.json.mockReturnValue(res);
  });

  describe('getAll', () => {
    it('should return all reactions', async () => {
      const executeMock = jest.fn().mockResolvedValue([]);
      (getAllReactionsFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ReactionsController.getAll(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Reactions listed successfully!', body: [] });
    });

    it('should handle QueryError', async () => {
      const executeMock = jest.fn().mockRejectedValue(new QueryError('Error'));
      (getAllReactionsFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ReactionsController.getAll(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error' });
    });

    it('should call next for unknown errors', async () => {
      const executeMock = jest.fn().mockRejectedValue(new Error('Unknown error'));
      (getAllReactionsFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ReactionsController.getAll(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Unknown error'));
    });
  });

  describe('getOne', () => {
    it('should return a specific reaction', async () => {
      req.params.id = '1';
      const executeMock = jest.fn().mockResolvedValue({});
      (getSpecificReactionFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ReactionsController.getOne(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Reaction listed successfully!', body: {} });
    });

    it('should handle InvalidParamError', async () => {
      req.params.id = '';
      await ReactionsController.getOne(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Missing property 'id'!" });
    });

    it('should handle QueryError', async () => {
      req.params.id = '1';
      const executeMock = jest.fn().mockRejectedValue(new QueryError('Error'));
      (getSpecificReactionFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ReactionsController.getOne(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Reaction not found' });
    });
  });

  describe('create', () => {
    it('should create a new reaction', async () => {
      req.body = { userId: 1, postId: 1 };
      const executeMock = jest.fn().mockResolvedValue({});
      (createReactionFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ReactionsController.create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Reaction created successfully!', body: {} });
    });

    it('should handle InvalidParamError', async () => {
      const executeMock = jest.fn().mockRejectedValue(new InvalidParamError('Invalid data'));
      (createReactionFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ReactionsController.create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid data' });
    });

    it('should handle QueryError', async () => {
      const executeMock = jest.fn().mockRejectedValue(new QueryError('Error'));
      (createReactionFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ReactionsController.create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error' });
    });

    it('should call next for unknown errors', async () => {
      const executeMock = jest.fn().mockRejectedValue(new Error('Unknown error'));
      (createReactionFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ReactionsController.create(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Unknown error'));
    });
  });

  describe('delete', () => {
    it('should delete a reaction', async () => {
      req.params.id = '1';
      const executeMock = jest.fn().mockResolvedValue({});
      (deleteReactionFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ReactionsController.delete(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Reaction deleted successfully!' });
    });

    it('should handle InvalidParamError', async () => {
      req.params.id = '';
      await ReactionsController.delete(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Missing property 'id'!" });
    });

    it('should handle QueryError', async () => {
      req.params.id = '1';
      const executeMock = jest.fn().mockRejectedValue(new QueryError('Error'));
      (deleteReactionFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ReactionsController.delete(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Reaction not found' });
    });
  });

  describe('getAllByPostId', () => {
    it('should return all reactions for a specific post', async () => {
      req.params.postId = '1';
      const executeMock = jest.fn().mockResolvedValue([]);
      (getAllReactionsByPostIdFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ReactionsController.getAllByPostId(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Reactions listed successfully!', body: [] });
    });

    it('should handle InvalidParamError', async () => {
      req.params.postId = '';
      await ReactionsController.getAllByPostId(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Missing property 'postId'!" });
    });

    it('should handle QueryError', async () => {
      req.params.postId = '1';
      const executeMock = jest.fn().mockRejectedValue(new QueryError('Error'));
      (getAllReactionsByPostIdFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ReactionsController.getAllByPostId(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Reactions not found' });
    });
  });

  describe('toggleLike', () => {
    it('should add a like if not existing', async () => {
      req.body = { userId: 1, postId: 1 };
      const reactionsRepositoryMock = mock<SequelizeReactionsRepository>();
      reactionsRepositoryMock.findByUserAndPost.mockResolvedValue(null);
      reactionsRepositoryMock.create.mockResolvedValue();

      (SequelizeReactionsRepository as jest.Mock).mockImplementation(() => reactionsRepositoryMock);

      await ReactionsController.toggleLike(req, res, next);

      expect(reactionsRepositoryMock.findByUserAndPost).toHaveBeenCalledWith(1, 1);
      expect(reactionsRepositoryMock.create).toHaveBeenCalledWith({ userId: 1, postId: 1 });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Like added successfully!' });
    });

    it('should remove a like if existing', async () => {
      req.body = { userId: 1, postId: 1 };
      const reactionsRepositoryMock = mock<SequelizeReactionsRepository>();
      const reaction: Reaction = { id: 1, userId: 1, postId: 1, createdAt: new Date(), updatedAt: new Date() };
      reactionsRepositoryMock.findByUserAndPost.mockResolvedValue(reaction);
      reactionsRepositoryMock.deleteByUserAndPost.mockResolvedValue();

      (SequelizeReactionsRepository as jest.Mock).mockImplementation(() => reactionsRepositoryMock);

      await ReactionsController.toggleLike(req, res, next);

      expect(reactionsRepositoryMock.findByUserAndPost).toHaveBeenCalledWith(1, 1);
      expect(reactionsRepositoryMock.deleteByUserAndPost).toHaveBeenCalledWith(1, 1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Like removed successfully!' });
    });

    it('should handle InvalidParamError', async () => {
      req.body = { userId: null, postId: 1 };
      await ReactionsController.toggleLike(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Missing property 'userId' or 'postId'!" });
    });

    it('should handle QueryError', async () => {
      req.body = { userId: 1, postId: 1 };
      const reactionsRepositoryMock = mock<SequelizeReactionsRepository>();
      reactionsRepositoryMock.findByUserAndPost.mockRejectedValue(new QueryError('Error'));

      (SequelizeReactionsRepository as jest.Mock).mockImplementation(() => reactionsRepositoryMock);

      await ReactionsController.toggleLike(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error' });
    });
  });

  describe('getTotalReactionsByPostId', () => {
    it('should return total reactions for a specific post', async () => {
      req.params.postId = '1';
      const executeMock = jest.fn().mockResolvedValue([{}, {}, {}]);
      (getAllReactionsByPostIdFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ReactionsController.getTotalReactionsByPostId(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Total reactions calculated successfully!', body: { total: 3 } });
    });

    it('should handle InvalidParamError', async () => {
      req.params.postId = '';
      await ReactionsController.getTotalReactionsByPostId(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Missing property 'postId'!" });
    });

    it('should handle QueryError', async () => {
      req.params.postId = '1';
      const executeMock = jest.fn().mockRejectedValue(new QueryError('Error'));
      (getAllReactionsByPostIdFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ReactionsController.getTotalReactionsByPostId(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Reactions not found' });
    });
  });
});
