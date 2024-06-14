import { Reaction } from "../entities/reaction";
import { ReactionsRepository } from "../interfaces/reactionsRepository";

export class GetSpecificReactionUseCase {
  constructor(private reactionsRepository: ReactionsRepository) {}

  async execute(id: number): Promise<Reaction> {
    const reaction = await this.reactionsRepository.findOne(id);
    if (!reaction) throw new Error("This reaction does not exist!");

    return reaction;
  }
}
