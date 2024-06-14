import { ReactionsRepository } from "../interfaces/reactionsRepository";

export class DeleteReactionUseCase {
  constructor(private reactionsRepository: ReactionsRepository) {}

  async execute(id: number): Promise<void> {
    // TODO: Add verification if necessary

    await this.reactionsRepository.delete(id);
  }
}
