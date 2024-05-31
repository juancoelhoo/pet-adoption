import { CreatePost } from "../entities/createPost";
import { CreatePostRequest } from "../entities/createPostRequest";
import { UpdatePost } from "../entities/updatePost";
import { UpdatePostRequest } from "../entities/updatePostRequest";
import { PostsRepository } from "../interfaces/postsRepository";

export class UpdatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(request: UpdatePostRequest): Promise<void> {
    const post: UpdatePost = {
      ...request,
    };

    await this.postsRepository.update(request.id, post);
  }
}
