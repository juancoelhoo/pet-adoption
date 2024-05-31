import { Post } from "../entities/post";
import { PostsRepository } from "../interfaces/postsRepository";

export class GetSpecificPostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne(id);
    if (!post) throw new Error("This post does not exist!");

    return post;
  }
}
