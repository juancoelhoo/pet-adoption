import { SequelizeReactionsRepository } from "@src/infra/services/sequelize/reactions/sequelizeReactionsRepository";
import { GetAllReactionsByPostIdUseCase } from "./domain/usecases/getAllReactionsByPostIdUseCase";
import { GetAllReactionsUseCase } from "@src/modules/reactions/domain/usecases/getAllReactionsUseCase";
import { GetSpecificReactionUseCase } from "@src/modules/reactions/domain/usecases/getSpecificReactionUseCase";
import { CreateReactionUseCase } from "@src/modules/reactions/domain/usecases/createReactionUseCase";
import { DeleteReactionUseCase } from "@src/modules/reactions/domain/usecases/deleteReactionUseCase";

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

export const getAllReactionsByPostIdFactory = () => {
  return new GetAllReactionsByPostIdUseCase(reactionsRepository);
};
