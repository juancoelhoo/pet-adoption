import { SequelizePostsRepository } from "@src/infra/services/sequelize/posts/sequelizePostsRepository";

import { GetAllPostsUseCase } from "./domain/usecases/getAllPostsUseCase";
import { GetSpecificPostUseCase } from "./domain/usecases/getSpecificPostUseCase";
import { CreatePostUseCase } from "./domain/usecases/createPostUseCase";
import { UpdatePostUseCase } from "./domain/usecases/updatePostUseCase";
import { DeletePostUseCase } from "./domain/usecases/deletePostUseCase";

const postsRepository = new SequelizePostsRepository();

export const getAllPostsFactory = () => {
  return new GetAllPostsUseCase(postsRepository);
};

export const getSpecificPostFactory = () => {
  return new GetSpecificPostUseCase(postsRepository);
};

export const createPostFactory = () => {
  return new CreatePostUseCase(postsRepository);
};

export const updatePostFactory = () => {
  return new UpdatePostUseCase(postsRepository);
};

export const deletePostFactory = () => {
  return new DeletePostUseCase(postsRepository);
};
