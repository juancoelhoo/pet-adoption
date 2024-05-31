import { Post } from "@src/modules/posts/domain/entities/post";
import { PostsRepository } from "@src/modules/posts/domain/interfaces/postsRepository";
import { PostModel } from "./postModel";
import { CreatePost } from "@src/modules/posts/domain/entities/createPost";
import { UpdatePost } from "@src/modules/posts/domain/entities/updatePost";

export class SequelizePostsRepository implements PostsRepository {
  async findAll(): Promise<Post[]> {
    try {
      const posts: PostModel[] = await PostModel.findAll();
      return posts.map(post => ({
        id: post.id,
        name: post.name,
        description: post.description,
        breed: post.breed,
        age: post.age,
        photoUrl: post.photo_url,
        ownerId: post.owner_id,
        createdAt: post.created_at
      }));
    } catch (error) {
      console.log(error);
      throw new Error("Error in listing posts: " + error);
    }
  }

  async findOne(id: number): Promise<Post | null> {
    try {
      const post = await PostModel.findOne({
        where: {
          id: id
        }
      });

      if (post == null) return null;

      return {
        id: post.id,
        name: post.name,
        description: post.description,
        breed: post.breed,
        age: post.age,
        photoUrl: post.photo_url,
        ownerId: post.owner_id,
        createdAt: post.created_at
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error in listing specific post: " + error);
    }
  }

  async create(post: CreatePost): Promise<void> {
    try {
      await PostModel.create({
        name: post.name,
        description: post.description,
        breed: post.breed,
        age: post.age,
        photo_url: post.photoUrl,
        owner_id: post.ownerId,
        created_at: post.createdAt
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error in creating post: " + error);
    }
  }

  async update(id: number, post: UpdatePost): Promise<void> {
    try {
      await PostModel.update(
        {
          name: post.name,
          description: post.description,
          breed: post.breed,
          age: post.age,
          photo_url: post.photoUrl,
          owner_id: post.ownerId
        },
        {
          where: {
            id: id
          }
        }
      );
    } catch (error) {
      console.log(error);
      throw new Error("Error in updating post: " + error);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      PostModel.destroy({
        where: {
          id: id
        }
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error in deleting post: " + error);
    }
  }
}
