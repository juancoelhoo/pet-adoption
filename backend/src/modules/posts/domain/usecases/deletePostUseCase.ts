import { PostsRepository } from "../interfaces/postsRepository";

export class DeletePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(id: number): Promise<void> {
    // TODO: Add verification if it is not in use

    await this.postsRepository.delete(id);
  }
}
