import { SequelizeExamplesRepository } from "@src/infra/services/sequelize/sequelizeExamplesRepository";
import { GetAllExamplesUseCase } from "./domain/usecases/getAllExamplesUseCase";

export const getAllExamplesFactory = () => {
  const examplesRepository = new SequelizeExamplesRepository();
  return new GetAllExamplesUseCase(examplesRepository);
};
