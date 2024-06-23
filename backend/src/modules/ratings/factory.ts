import { SequelizeRatingsRepository } from "@src/infra/services/sequelize/ratings/sequelizeRatingsRepository";

import { GetAllRatingsUseCase } from "@src/modules/ratings/domain/usecases/getAllRatingsUseCase";
import { GetSpecificRatingUseCase } from "@src/modules/ratings/domain/usecases/getSpecificRatingUseCase";
import { CreateRatingUseCase } from "@src/modules/ratings/domain/usecases/createRatingUseCase";
import { UpdateRatingUseCase } from "@src/modules/ratings/domain/usecases/updateRatingUseCase";
import { DeleteRatingUseCase } from "@src/modules/ratings/domain/usecases/deleteRatingUseCase";
import { CalculateUserAverageRatingUseCase } from "@src/modules/ratings/domain/usecases/calculateUserAverageRatingUseCase";

const ratingsRepository = new SequelizeRatingsRepository();

export const getAllRatingsFactory = () => {
  return new GetAllRatingsUseCase(ratingsRepository);
};

export const getSpecificRatingFactory = () => {
  return new GetSpecificRatingUseCase(ratingsRepository);
};

export const createRatingFactory = () => {
  return new CreateRatingUseCase(ratingsRepository);
};

export const updateRatingFactory = () => {
  return new UpdateRatingUseCase(ratingsRepository);
};

export const deleteRatingFactory = () => {
  return new DeleteRatingUseCase(ratingsRepository);
};

export const calculateUserAverageRatingFactory = () => {
  return new CalculateUserAverageRatingUseCase(ratingsRepository);
};
