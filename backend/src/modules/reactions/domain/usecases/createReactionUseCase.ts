import { CreateReactionRequest } from "../entities/createReactionRequest";
import { ReactionsRepository } from "../interfaces/reactionsRepository";

export class CreateReactionUseCase {
  constructor(private reactionsRepository: ReactionsRepository) {}

  async execute(request: CreateReactionRequest): Promise<void> {
    await this.reactionsRepository.create(request);
  }
}
