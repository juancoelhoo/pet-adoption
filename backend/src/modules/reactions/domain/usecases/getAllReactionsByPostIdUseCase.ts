import { ReactionsRepository } from "../interfaces/reactionsRepository";
import { Reaction } from "../entities/reaction";

export class GetAllReactionsByPostIdUseCase {
  constructor(private reactionsRepository: ReactionsRepository) {}

  async execute(postId: number): Promise<Reaction[]> {
    return await this.reactionsRepository.findAllByPostId(postId);
  }
}
