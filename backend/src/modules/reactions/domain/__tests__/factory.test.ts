import { SequelizeReactionsRepository } from "@src/infra/services/sequelize/reactions/sequelizeReactionsRepository";
import { GetAllReactionsByPostIdUseCase } from "@src/modules/reactions/domain/usecases/getAllReactionsByPostIdUseCase";
import { GetAllReactionsUseCase } from "@src/modules/reactions/domain/usecases/getAllReactionsUseCase";
import { GetSpecificReactionUseCase } from "@src/modules/reactions/domain/usecases/getSpecificReactionUseCase";
import { CreateReactionUseCase } from "@src/modules/reactions/domain/usecases/createReactionUseCase";
import { DeleteReactionUseCase } from "@src/modules/reactions/domain/usecases/deleteReactionUseCase";

import { 
  getAllReactionsFactory, 
  getSpecificReactionFactory, 
  createReactionFactory, 
  deleteReactionFactory, 
  getAllReactionsByPostIdFactory 
} from "../../factory";

jest.mock("@src/infra/services/sequelize/reactions/sequelizeReactionsRepository");

describe('Factory functions', () => {
  it('getAllReactionsFactory should create GetAllReactionsUseCase with SequelizeReactionsRepository', () => {
    const useCase = getAllReactionsFactory();
    expect(useCase).toBeInstanceOf(GetAllReactionsUseCase);
    expect((useCase as any).reactionsRepository).toBeInstanceOf(SequelizeReactionsRepository);
  });

  it('getSpecificReactionFactory should create GetSpecificReactionUseCase with SequelizeReactionsRepository', () => {
    const useCase = getSpecificReactionFactory();
    expect(useCase).toBeInstanceOf(GetSpecificReactionUseCase);
    expect((useCase as any).reactionsRepository).toBeInstanceOf(SequelizeReactionsRepository);
  });

  it('createReactionFactory should create CreateReactionUseCase with SequelizeReactionsRepository', () => {
    const useCase = createReactionFactory();
    expect(useCase).toBeInstanceOf(CreateReactionUseCase);
    expect((useCase as any).reactionsRepository).toBeInstanceOf(SequelizeReactionsRepository);
  });

  it('deleteReactionFactory should create DeleteReactionUseCase with SequelizeReactionsRepository', () => {
    const useCase = deleteReactionFactory();
    expect(useCase).toBeInstanceOf(DeleteReactionUseCase);
    expect((useCase as any).reactionsRepository).toBeInstanceOf(SequelizeReactionsRepository);
  });

  it('getAllReactionsByPostIdFactory should create GetAllReactionsByPostIdUseCase with SequelizeReactionsRepository', () => {
    const useCase = getAllReactionsByPostIdFactory();
    expect(useCase).toBeInstanceOf(GetAllReactionsByPostIdUseCase);
    expect((useCase as any).reactionsRepository).toBeInstanceOf(SequelizeReactionsRepository);
  });
});
