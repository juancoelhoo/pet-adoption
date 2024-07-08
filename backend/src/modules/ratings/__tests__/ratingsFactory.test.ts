import { SequelizeRatingsRepository } from "@src/infra/services/sequelize/ratings/sequelizeRatingsRepository";
import {
  getAllRatingsFactory,
  getSpecificRatingFactory,
  createRatingFactory,
  updateRatingFactory,
  deleteRatingFactory,
  calculateUserAverageRatingFactory,
} from "../factory";
import { GetAllRatingsUseCase } from "../domain/usecases/getAllRatingsUseCase";
import { GetSpecificRatingUseCase } from "../domain//usecases/getSpecificRatingUseCase";
import { CreateRatingUseCase } from "../domain//usecases/createRatingUseCase";
import { UpdateRatingUseCase } from "../domain//usecases/updateRatingUseCase";
import { DeleteRatingUseCase } from "../domain//usecases/deleteRatingUseCase";
import { CalculateUserAverageRatingUseCase } from "../domain//usecases/calculateUserAverageRatingUseCase";

jest.mock("@src/infra/services/sequelize/ratings/sequelizeRatingsRepository");

describe("Ratings Factory", () => {
  let repository: SequelizeRatingsRepository;

  beforeEach(() => {
    repository = new SequelizeRatingsRepository();
    (SequelizeRatingsRepository as jest.Mock).mockReturnValue(repository);
  });

  describe("getAllRatingsFactory", () => {
    it("should create an instance of GetAllRatingsUseCase", () => {
      const useCase = getAllRatingsFactory();
      expect(useCase).toBeInstanceOf(GetAllRatingsUseCase);
      expect(useCase['ratingsRepository']).toBeInstanceOf(SequelizeRatingsRepository);
    });
  });

  describe("getSpecificRatingFactory", () => {
    it("should create an instance of GetSpecificRatingUseCase", () => {
      const useCase = getSpecificRatingFactory();
      expect(useCase).toBeInstanceOf(GetSpecificRatingUseCase);
      expect(useCase['ratingsRepository']).toBeInstanceOf(SequelizeRatingsRepository);
    });
  });

  describe("createRatingFactory", () => {
    it("should create an instance of CreateRatingUseCase", () => {
      const useCase = createRatingFactory();
      expect(useCase).toBeInstanceOf(CreateRatingUseCase);
      expect(useCase['ratingsRepository']).toBeInstanceOf(SequelizeRatingsRepository);
    });
  });

  describe("updateRatingFactory", () => {
    it("should create an instance of UpdateRatingUseCase", () => {
      const useCase = updateRatingFactory();
      expect(useCase).toBeInstanceOf(UpdateRatingUseCase);
      expect(useCase['ratingsRepository']).toBeInstanceOf(SequelizeRatingsRepository);
    });
  });

  describe("deleteRatingFactory", () => {
    it("should create an instance of DeleteRatingUseCase", () => {
      const useCase = deleteRatingFactory();
      expect(useCase).toBeInstanceOf(DeleteRatingUseCase);
      expect(useCase['ratingsRepository']).toBeInstanceOf(SequelizeRatingsRepository);
    });
  });

  describe("calculateUserAverageRatingFactory", () => {
    it("should create an instance of CalculateUserAverageRatingUseCase", () => {
      const useCase = calculateUserAverageRatingFactory();
      expect(useCase).toBeInstanceOf(CalculateUserAverageRatingUseCase);
      expect(useCase['ratingsRepository']).toBeInstanceOf(SequelizeRatingsRepository);
    });
  });
});