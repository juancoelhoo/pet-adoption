import { Post } from "../entities/post";
import { PostsRepository } from "../interfaces/postsRepository";

export class GetAllPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(): Promise<Post[]> {
    return await this.postsRepository.findAll();
  }
}
