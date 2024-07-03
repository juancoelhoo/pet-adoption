import { Request, Response, NextFunction } from 'express';
import { mock, MockProxy } from 'jest-mock-extended';
import UsersController from '../controller';
import { createUserFactory, deleteUserFactory, getAllUsersFactory, getSpecificUserFactory, updateUserFactory } from '@src/modules/users/factory';
import { InvalidParamError } from '@src/infra/api/errors/InvalidParamError';
import { QueryError } from '@src/infra/api/errors/QueryError';

jest.mock('@src/modules/users/factory');

describe('UsersController', () => {
  let req: MockProxy<Request>;
  let res: MockProxy<Response>;
  let next: MockProxy<NextFunction>;

  beforeEach(() => {
    req = mock<Request>();
    res = mock<Response>();
    next = mock<NextFunction>();
    res.status.mockReturnThis();
    res.json.mockReturnThis();
  });

  describe('getAll', () => {
    it('should return 200 and the list of users', async () => {
      const usersFactory = {
        execute: jest.fn().mockResolvedValue([{ id: 1, name: 'User1' }]),
      };
      (getAllUsersFactory as jest.Mock).mockReturnValue(usersFactory);

      await UsersController.getAll(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Users listed successfully!',
        body: [{ id: 1, name: 'User1' }],
      });
    });

    it('should handle query errors', async () => {
      const error = new QueryError('Query failed');
      const usersFactory = {
        execute: jest.fn().mockRejectedValue(error),
      };
      (getAllUsersFactory as jest.Mock).mockReturnValue(usersFactory);

      await UsersController.getAll(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Query failed' });
    });

    it('should call next with the error for unknown errors', async () => {
      const error = new Error('Unknown error');
      const usersFactory = {
        execute: jest.fn().mockRejectedValue(error),
      };
      (getAllUsersFactory as jest.Mock).mockReturnValue(usersFactory);

      await UsersController.getAll(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getOne', () => {
    it('should return 200 and the user if found', async () => {
      const usersFactory = {
        execute: jest.fn().mockResolvedValue({ id: 1, name: 'User1' }),
      };
      (getSpecificUserFactory as jest.Mock).mockReturnValue(usersFactory);
      req.params.id = '1';

      await UsersController.getOne(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User listed successfully!',
        body: { id: 1, name: 'User1' },
      });
    });

    it('should handle invalid param errors', async () => {
      req.params.id = '';

      await UsersController.getOne(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Missing property 'id'!" });
    });

    it('should handle query errors when user not found', async () => {
      const error = new QueryError('User not found');
      const usersFactory = {
        execute: jest.fn().mockRejectedValue(error),
      };
      (getSpecificUserFactory as jest.Mock).mockReturnValue(usersFactory);
      req.params.id = '1';

      await UsersController.getOne(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should call next with the error for unknown errors', async () => {
      const error = new Error('Unknown error');
      const usersFactory = {
        execute: jest.fn().mockRejectedValue(error),
      };
      (getSpecificUserFactory as jest.Mock).mockReturnValue(usersFactory);
      req.params.id = '1';

      await UsersController.getOne(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('create', () => {
    it('should create a new user and return 201', async () => {
      const usersFactory = {
        execute: jest.fn().mockResolvedValue({}),
      };
      (createUserFactory as jest.Mock).mockReturnValue(usersFactory);
      req.body = { name: 'User1', email: 'user1@example.com', password: 'password' };

      await UsersController.create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User created successfully!',
      });
    });

    it('should handle invalid param errors', async () => {
      const error = new InvalidParamError('Invalid data');
      const usersFactory = {
        execute: jest.fn().mockRejectedValue(error),
      };
      (createUserFactory as jest.Mock).mockReturnValue(usersFactory);
      req.body = {};

      await UsersController.create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid data' });
    });

    it('should call next with the error for unknown errors', async () => {
      const error = new Error('Unknown error');
      const usersFactory = {
        execute: jest.fn().mockRejectedValue(error),
      };
      (createUserFactory as jest.Mock).mockReturnValue(usersFactory);
      req.body = { name: 'User1', email: 'user1@example.com', password: 'password' };

      await UsersController.create(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('update', () => {
    it('should update an existing user and return 200', async () => {
      const usersFactory = {
        execute: jest.fn().mockResolvedValue({}),
      };
      (updateUserFactory as jest.Mock).mockReturnValue(usersFactory);
      req.params.id = '1';
      req.body = { name: 'Updated User' };

      await UsersController.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User updated successfully!',
      });
    });

    it('should handle invalid param errors', async () => {
      const error = new InvalidParamError('Invalid data');
      const usersFactory = {
        execute: jest.fn().mockRejectedValue(error),
      };
      (updateUserFactory as jest.Mock).mockReturnValue(usersFactory);
      req.params.id = '1';
      req.body = {};

      await UsersController.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid data' });
    });

    it('should call next with the error for unknown errors', async () => {
      const error = new Error('Unknown error');
      const usersFactory = {
        execute: jest.fn().mockRejectedValue(error),
      };
      (updateUserFactory as jest.Mock).mockReturnValue(usersFactory);
      req.params.id = '1';
      req.body = { name: 'Updated User' };

      await UsersController.update(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('delete', () => {
    it('should delete a user and return 200', async () => {
      const usersFactory = {
        execute: jest.fn().mockResolvedValue({}),
      };
      (deleteUserFactory as jest.Mock).mockReturnValue(usersFactory);
      req.params.id = '1';

      await UsersController.delete(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User deleted successfully!',
      });
    });

    it('should handle invalid param errors', async () => {
      const error = new InvalidParamError('Invalid data');
      const usersFactory = {
        execute: jest.fn().mockRejectedValue(error),
      };
      (deleteUserFactory as jest.Mock).mockReturnValue(usersFactory);
      req.params.id = '';

      await UsersController.delete(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid data' });
    });

    it('should handle query errors when user not found', async () => {
      const error = new QueryError('User not found');
      const usersFactory = {
        execute: jest.fn().mockRejectedValue(error),
      };
      (deleteUserFactory as jest.Mock).mockReturnValue(usersFactory);
      req.params.id = '1';

      await UsersController.delete(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should call next with the error for unknown errors', async () => {
      const error = new Error('Unknown error');
      const usersFactory = {
        execute: jest.fn().mockRejectedValue(error),
      };
      (deleteUserFactory as jest.Mock).mockReturnValue(usersFactory);
      req.params.id = '1';

      await UsersController.delete(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
