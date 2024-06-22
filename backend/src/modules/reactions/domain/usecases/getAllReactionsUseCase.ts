import { Reaction } from "../entities/reaction";
import { ReactionsRepository } from "../interfaces/reactionsRepository";

export class GetAllReactionsUseCase {
  constructor(private reactionsRepository: ReactionsRepository) {}

  async execute(): Promise<Reaction[]> {
    return await this.reactionsRepository.findAll();
  }
}
