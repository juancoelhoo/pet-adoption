import { CreatePost } from "../entities/createPost";
import { CreatePostRequest } from "../entities/createPostRequest";
import { PostsRepository } from "../interfaces/postsRepository";

export class CreatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(request: CreatePostRequest): Promise<void> {
    const post: CreatePost = {
      ...request,
      createdAt: new Date(request.createdAt)
    };

    await this.postsRepository.create(post);
  }
}
