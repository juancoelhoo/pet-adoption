import { CreatePost } from "../entities/createPost";
import { Post } from "../entities/post";
import { UpdatePost } from "../entities/updatePost";

export interface PostsRepository {
  findAll(): Promise<Post[]>;
  findOne(id: number): Promise<Post | null>;
  create(post: CreatePost): Promise<void>;
  update(id: number, post: UpdatePost): Promise<void>;
  delete(id: number): Promise<void>;
}
