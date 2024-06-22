import { SequelizeReactionsRepository } from "@src/infra/services/sequelize/reactions/sequelizeReactionsRepository";

import { GetAllReactionsUseCase } from "./domain/usecases/getAllReactionsUseCase";
import { GetSpecificReactionUseCase } from "./domain/usecases/getSpecificReactionUseCase";
import { CreateReactionUseCase } from "./domain/usecases/createReactionUseCase";
import { DeleteReactionUseCase } from "./domain/usecases/deleteReactionUseCase";

const reactionsRepository = new SequelizeReactionsRepository();

export const getAllReactionsFactory = () => {
  return new GetAllReactionsUseCase(reactionsRepository);
};

export const getSpecificReactionFactory = () => {
  return new GetSpecificReactionUseCase(reactionsRepository);
};

export const createReactionFactory = () => {
  return new CreateReactionUseCase(reactionsRepository);
};

export const deleteReactionFactory = () => {
  return new DeleteReactionUseCase(reactionsRepository);
};
