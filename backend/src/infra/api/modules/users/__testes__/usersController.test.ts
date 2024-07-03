// src/infra/api/modules/users/__tests__/usersController.test.ts
import { Request, Response, NextFunction } from 'express';
import { mock, MockProxy } from 'jest-mock-extended';
import UsersController from '../controller';
import { getAllUsersFactory } from '@src/modules/users/factory';
import { QueryError } from '@src/infra/api/errors/QueryError';

jest.mock('@src/modules/users/factory.ts');

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

  // Testes para os outros métodos (getOne, create, update, delete) seguem um padrão similar
});
