import { mock, MockProxy } from 'jest-mock-extended';
import PostsController from '../controller';
import { Request, Response } from 'express';
import { createPostFactory, deletePostFactory, getAllPostsFactory, getSpecificPostFactory, updatePostFactory, } from '@src/modules/posts/factory';
import { InvalidParamError } from '@src/infra/api/errors/InvalidParamError';
import { CreatePostRequest } from '@src/modules/posts/domain/entities/createPostRequest';
import { UpdatePostRequest } from '@src/modules/posts/domain/entities/updatePostRequest';

jest.mock('@src/modules/posts/factory');

describe('PostsController', () => {
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
    it('should return all posts', async () => {
      const executeMock = jest.fn().mockResolvedValue([]);
      (getAllPostsFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await PostsController.getAll(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Posts listed successfully!', body: [] });
    });

    it('should call next for errors', async () => {
      const error = new Error('Error');
      const executeMock = jest.fn().mockRejectedValue(error);
      (getAllPostsFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await PostsController.getAll(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getOne', () => {
    it('should return a specific post', async () => {
      req.params.id = '1';
      const executeMock = jest.fn().mockResolvedValue({});
      (getSpecificPostFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await PostsController.getOne(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post listed successfully!', body: {} });
    });

    it('should return 404 if post not found', async () => {
      req.params.id = '8944998';
      const executeMock = jest.fn().mockResolvedValue(null);
      (getSpecificPostFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await PostsController.getOne(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post not found!' });
    });

    it('should return 400 if id is missing', async () => {
      req.params.id = '';
      await PostsController.getOne(req, res, next);

      expect(next).toHaveBeenCalledWith(new InvalidParamError("Missing property 'id'!"));
    });

    it('should call next for errors', async () => {
      req.params.id = '1';
      const error = new Error('Error');
      const executeMock = jest.fn().mockRejectedValue(error);
      (getSpecificPostFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await PostsController.getOne(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('create', () => {
    it('should create a new post', async () => {
      req.body = { createdAt: new Date().toISOString(), age: 5, breed: "Breed", description: "Desc 1", name: "Name", ownerId: 1, photoUrl: "https://i.imgur.com/tmUa2ir.png" } as CreatePostRequest;
      const executeMock = jest.fn().mockResolvedValue({});
      (createPostFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await PostsController.create(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post created successfully!' });
    });

    it('should call next on error', async () => {
        req.body = { createdAt: new Date().toISOString(), age: 5, breed: "Breed", description: "Desc 1", name: "Name", ownerId: 1, photoUrl: "https://i.imgur.com/tmUa2ir.png" } as CreatePostRequest;
      const error = new Error('Error');
      const executeMock = jest.fn().mockRejectedValue(error);
      (createPostFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await PostsController.create(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('update', () => {
    it('should update an existing post', async () => {
      req.body = { id: 1, createdAt: new Date().toISOString(), age: 5, breed: "Breed", description: "Desc 1", name: "Name", ownerId: 1, photoUrl: "https://i.imgur.com/tmUa2ir.png" } as UpdatePostRequest;
      const getMock = jest.fn().mockResolvedValue({});
      const updateMock = jest.fn().mockResolvedValue({});
      (getSpecificPostFactory as jest.Mock).mockReturnValue({ execute: getMock });
      (updatePostFactory as jest.Mock).mockReturnValue({ execute: updateMock });

      await PostsController.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post updated successfully!' });
    });

    it('should return 404 if post not found', async () => {
      req.body = { id: 1, createdAt: new Date().toISOString(), age: 5, breed: "Breed", description: "Desc 1", name: "Name", ownerId: 1, photoUrl: "https://i.imgur.com/tmUa2ir.png" } as UpdatePostRequest;
      const getMock = jest.fn().mockResolvedValue(null);
      const updateMock = jest.fn();
      (getSpecificPostFactory as jest.Mock).mockReturnValue({ execute: getMock });
      (updatePostFactory as jest.Mock).mockReturnValue({ execute: updateMock });

      await PostsController.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post not found!' });
      expect(updateMock).not.toHaveBeenCalled();
    });

    it('should call next on error', async () => {
      req.body = { id: 1, createdAt: new Date().toISOString(), age: 5, breed: "Breed", description: "Desc 1", name: "Name", ownerId: 1, photoUrl: "https://i.imgur.com/tmUa2ir.png" } as UpdatePostRequest;
      const error = new Error('Error');
      const getMock = jest.fn().mockRejectedValue(error);
      (getSpecificPostFactory as jest.Mock).mockReturnValue({ execute: getMock });

      await PostsController.update(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    it('should return 400 if id is missing', async () => {
      await PostsController.update(req, res, next);

      expect(next).toHaveBeenCalledWith(new InvalidParamError("Missing property 'id'!"));
    });
  });

  describe('delete', () => {
    it('should delete a post', async () => {
      req.params.id = '1';
      const getMock = jest.fn().mockResolvedValue({});
      const deleteMock = jest.fn().mockResolvedValue({});
      (getSpecificPostFactory as jest.Mock).mockReturnValue({ execute: getMock });
      (deletePostFactory as jest.Mock).mockReturnValue({ execute: deleteMock });

      await PostsController.delete(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post deleted successfully!' });
    });

    it('should return 404 if post not found', async () => {
      req.params.id = '1';
      const getMock = jest.fn().mockResolvedValue(null);
      const deleteMock = jest.fn();
      (getSpecificPostFactory as jest.Mock).mockReturnValue({ execute: getMock });
      (deletePostFactory as jest.Mock).mockReturnValue({ execute: deleteMock });

      await PostsController.delete(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post not found!' });
      expect(deleteMock).not.toHaveBeenCalled();
    });

    it('should call next on error', async () => {
      req.params.id = '1';
      const error = new Error('Error');
      const getMock = jest.fn().mockRejectedValue(error);
      (getSpecificPostFactory as jest.Mock).mockReturnValue({ execute: getMock });

      await PostsController.delete(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    it('should return 400 if id is missing', async () => {
      req.params.id = '';
      await PostsController.delete(req, res, next);

      expect(next).toHaveBeenCalledWith(new InvalidParamError("Missing property 'id'!"));
    });
  });
});
