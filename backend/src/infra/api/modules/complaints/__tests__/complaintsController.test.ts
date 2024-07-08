import { mock, MockProxy } from 'jest-mock-extended';
import ComplaintsController from '../controller';
import { Request, Response } from 'express';
import { createComplaintFactory, deleteComplaintFactory, getAllComplaintsFactory, getSpecificComplaintFactory, updateComplaintFactory } from '@src/modules/complaints/factory';
import { InvalidParamError } from '@src/infra/api/errors/InvalidParamError';
import { CreateComplaintRequest } from '@src/modules/complaints/domain/entities/createComplaintRequest';
import { UpdateComplaintRequest } from '@src/modules/complaints/domain/entities/updateComplaintRequest';

jest.mock('@src/modules/complaints/factory');

describe('ComplaintsController', () => {
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
    it('should return all complaints', async () => {
      const executeMock = jest.fn().mockResolvedValue([]);
      (getAllComplaintsFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ComplaintsController.getAll(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Complaints listed successfully!', body: [] });
    });

    it('should call next for errors', async () => {
      const error = new Error('Error');
      const executeMock = jest.fn().mockRejectedValue(error);
      (getAllComplaintsFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ComplaintsController.getAll(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getOne', () => {
    it('should return a specific complaint', async () => {
      req.params.id = '1';
      const executeMock = jest.fn().mockResolvedValue({});
      (getSpecificComplaintFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ComplaintsController.getOne(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Complaint listed successfully!', body: {} });
    });

    it('should return 404 if complaint not found', async () => {
      req.params.id = '8944998';
      const executeMock = jest.fn().mockResolvedValue(null);
      (getSpecificComplaintFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ComplaintsController.getOne(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Complaint not found!' });
    });

    it('should return 400 if id is missing', async () => {
      req.params.id = '';
      await ComplaintsController.getOne(req, res, next);

      expect(next).toHaveBeenCalledWith(new InvalidParamError("Missing property 'id'!"));
    });

    it('should call next for errors', async () => {
      req.params.id = '1';
      const error = new Error('Error');
      const executeMock = jest.fn().mockRejectedValue(error);
      (getSpecificComplaintFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ComplaintsController.getOne(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('create', () => {
    it('should create a new complaint', async () => {
      req.body = { reportedPostId: 1, reporterUserId: 2, reason: "Reason 1" } as CreateComplaintRequest;
      const executeMock = jest.fn().mockResolvedValue({});
      (createComplaintFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ComplaintsController.create(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Complaint created successfully!' });
    });

    it('should call next on error', async () => {
      req.body = { reportedPostId: 1, reporterUserId: 2, reason: "Reason 1" } as CreateComplaintRequest;
      const error = new Error('Error');
      const executeMock = jest.fn().mockRejectedValue(error);
      (createComplaintFactory as jest.Mock).mockReturnValue({ execute: executeMock });

      await ComplaintsController.create(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('update', () => {
    it('should update an existing complaint', async () => {
      req.params.id = "1";
      req.body = { reason: "Reason 2" } as UpdateComplaintRequest;
      const getMock = jest.fn().mockResolvedValue({});
      const updateMock = jest.fn().mockResolvedValue({});
      (getSpecificComplaintFactory as jest.Mock).mockReturnValue({ execute: getMock });
      (updateComplaintFactory as jest.Mock).mockReturnValue({ execute: updateMock });

      await ComplaintsController.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Complaint updated successfully!' });
    });

    it('should return 404 if complaint not found', async () => {
      req.params.id = "1";
      req.body = { reason: "Reason 2" } as UpdateComplaintRequest;
      const getMock = jest.fn().mockResolvedValue(null);
      const updateMock = jest.fn();
      (getSpecificComplaintFactory as jest.Mock).mockReturnValue({ execute: getMock });
      (updateComplaintFactory as jest.Mock).mockReturnValue({ execute: updateMock });

      await ComplaintsController.update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Complaint not found!' });
      expect(updateMock).not.toHaveBeenCalled();
    });

    it('should call next on error', async () => {
      req.params.id = "1";
      req.body = { reason: "Reason 2" } as UpdateComplaintRequest;
      const error = new Error('Error');
      const getMock = jest.fn().mockRejectedValue(error);
      (getSpecificComplaintFactory as jest.Mock).mockReturnValue({ execute: getMock });

      await ComplaintsController.update(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    it('should return 400 if id is missing', async () => {
      await ComplaintsController.update(req, res, next);

      expect(next).toHaveBeenCalledWith(new InvalidParamError("Missing property 'id'!"));
    });
  });

  describe('delete', () => {
    it('should delete a complaint', async () => {
      req.params.id = '1';
      const getMock = jest.fn().mockResolvedValue({});
      const deleteMock = jest.fn().mockResolvedValue({});
      (getSpecificComplaintFactory as jest.Mock).mockReturnValue({ execute: getMock });
      (deleteComplaintFactory as jest.Mock).mockReturnValue({ execute: deleteMock });

      await ComplaintsController.delete(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Complaint deleted successfully!' });
    });

    it('should return 404 if complaint not found', async () => {
      req.params.id = '1';
      const getMock = jest.fn().mockResolvedValue(null);
      const deleteMock = jest.fn();
      (getSpecificComplaintFactory as jest.Mock).mockReturnValue({ execute: getMock });
      (deleteComplaintFactory as jest.Mock).mockReturnValue({ execute: deleteMock });

      await ComplaintsController.delete(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Complaint not found!' });
      expect(deleteMock).not.toHaveBeenCalled();
    });

    it('should call next on error', async () => {
      req.params.id = '1';
      const error = new Error('Error');
      const getMock = jest.fn().mockRejectedValue(error);
      (getSpecificComplaintFactory as jest.Mock).mockReturnValue({ execute: getMock });

      await ComplaintsController.delete(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    it('should return 400 if id is missing', async () => {
      req.params.id = '';
      await ComplaintsController.delete(req, res, next);

      expect(next).toHaveBeenCalledWith(new InvalidParamError("Missing property 'id'!"));
    });
  });
});