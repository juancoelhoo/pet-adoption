import { mock, MockProxy } from 'jest-mock-extended';
import FilesController from '../controller';
import { Request, Response } from 'express';
import { InvalidParamError } from '@src/infra/api/errors/InvalidParamError';
import { uploadFileFactory } from '@src/modules/files/factory';

jest.mock('@src/modules/files/factory');

describe('FilesController', () => {
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

  describe('uploadFile', () => {
    it('should return all posts', async () => {
      req.file!.path = "/tmp/imgs";
      const executeMock = jest.fn().mockResolvedValue([]);
      (uploadFileFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await FilesController.uploadFile(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'File uploaded successfully!', body: [] });
    });

    it('should call next for errors', async () => {
      req.file!.path = "/tmp/imgs";
      const error = new Error('Error');
      const executeMock = jest.fn().mockRejectedValue(error);
      (uploadFileFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await FilesController.uploadFile(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    it('should return 400 if file is missing', async () => {
      await FilesController.uploadFile(req, res, next);

      expect(next).toHaveBeenCalledWith(new InvalidParamError("No file received!"));
    });
  });
});
