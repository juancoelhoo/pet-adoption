import { SequelizeComplaintsRepository } from "@src/infra/services/sequelize/complaints/sequelizeComplaintsRepository";
import { ComplaintsRepository } from "../domain/interfaces/complaintsRepository";
import { CreateComplaintUseCase } from "../domain/usecases/createComplaintUseCase";
import { DeleteComplaintUseCase } from "../domain/usecases/deleteComplaintUseCase";
import { GetAllComplaintsUseCase } from "../domain/usecases/getAllComplaintsUseCase";
import { GetSpecificComplaintUseCase } from "../domain/usecases/getSpecificComplaintUseCase";
import { UpdateComplaintUseCase } from "../domain/usecases/updateComplaintUseCase";
import { getAllComplaintsFactory, getSpecificComplaintFactory, createComplaintFactory, updateComplaintFactory, deleteComplaintFactory } from "../factory";

jest.mock("@src/infra/services/sequelize/complaints/sequelizeComplaintsRepository");

describe("Complaints Factory", () => {
  let repository: ComplaintsRepository;

  beforeEach(() => {
    repository = new SequelizeComplaintsRepository();
    (SequelizeComplaintsRepository as jest.Mock).mockReturnValue(repository);
  });

  describe("getAllComplaintsFactory", () => {
    it("should create an instance of GetAllComplaintsUseCase", () => {
      const useCase = getAllComplaintsFactory();
      expect(useCase).toBeInstanceOf(GetAllComplaintsUseCase);
      expect(useCase['complaintsRepository']).toBeInstanceOf(SequelizeComplaintsRepository);
    });
  });

  describe("getSpecificComplaintFactory", () => {
    it("should create an instance of GetSpecificComplaintUseCase", () => {
      const useCase = getSpecificComplaintFactory();
      expect(useCase).toBeInstanceOf(GetSpecificComplaintUseCase);
      expect(useCase['complaintsRepository']).toBeInstanceOf(SequelizeComplaintsRepository);
    });
  });

  describe("createComplaintFactory", () => {
    it("should create an instance of CreateComplaintUseCase", () => {
      const useCase = createComplaintFactory();
      expect(useCase).toBeInstanceOf(CreateComplaintUseCase);
      expect(useCase['complaintsRepository']).toBeInstanceOf(SequelizeComplaintsRepository);
    });
  });

  describe("updateComplaintFactory", () => {
    it("should create an instance of UpdateComplaintUseCase", () => {
      const useCase = updateComplaintFactory();
      expect(useCase).toBeInstanceOf(UpdateComplaintUseCase);
      expect(useCase['complaintsRepository']).toBeInstanceOf(SequelizeComplaintsRepository);
    });
  });

  describe("deleteComplaintFactory", () => {
    it("should create an instance of DeleteComplaintUseCase", () => {
      const useCase = deleteComplaintFactory();
      expect(useCase).toBeInstanceOf(DeleteComplaintUseCase);
      expect(useCase['complaintsRepository']).toBeInstanceOf(SequelizeComplaintsRepository);
    });
  });
});