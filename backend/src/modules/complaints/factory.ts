import { SequelizeComplaintsRepository } from "@src/infra/services/sequelize/complaints/sequelizeComplaintsRepository";

import { CreateComplaintUseCase } from "./domain/usecases/createComplaintUseCase";
import { GetAllComplaintsUseCase } from "./domain/usecases/getAllComplaintsUseCase";
import { GetSpecificComplaintUseCase } from "./domain/usecases/getSpecificComplaintUseCase";
import { DeleteComplaintUseCase } from "./domain/usecases/deleteComplaintUseCase";
import { UpdateComplaintUseCase } from "./domain/usecases/updateComplaintUseCase"; 

const complaintsRepository = new SequelizeComplaintsRepository();

export const getAllComplaintsFactory = () => {
  return new GetAllComplaintsUseCase(complaintsRepository);
};

export const getSpecificComplaintFactory = () => {
  return new GetSpecificComplaintUseCase(complaintsRepository);
};

export const createComplaintFactory = () => {
  return new CreateComplaintUseCase(complaintsRepository);
};

export const deleteComplaintFactory = () => {
  return new DeleteComplaintUseCase(complaintsRepository);
};

export const updateComplaintFactory = () => { // Adicionado
  return new UpdateComplaintUseCase(complaintsRepository);
};
