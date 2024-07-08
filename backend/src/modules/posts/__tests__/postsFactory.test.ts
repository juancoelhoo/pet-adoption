import { SequelizePostsRepository } from "@src/infra/services/sequelize/posts/sequelizePostsRepository";
import { PostsRepository } from "@src/modules/posts/domain/interfaces/postsRepository";
import { CreatePostUseCase } from "@src/modules/posts/domain/usecases/createPostUseCase";
import { DeletePostUseCase } from "@src/modules/posts/domain/usecases/deletePostUseCase";
import { GetAllPostsUseCase } from "@src/modules/posts/domain/usecases/getAllPostsUseCase";
import { GetSpecificPostUseCase } from "@src/modules/posts/domain/usecases/getSpecificPostUseCase";
import { UpdatePostUseCase } from "@src/modules/posts/domain/usecases/updatePostUseCase";
import { createPostFactory, deletePostFactory, getAllPostsFactory, getSpecificPostFactory, updatePostFactory } from "@src/modules/posts/factory";

jest.mock("@src/infra/services/sequelize/posts/sequelizePostsRepository");

describe("Posts Factory", () => {
  let repository: PostsRepository;

  beforeEach(() => {
    repository = new SequelizePostsRepository();
    (SequelizePostsRepository as jest.Mock).mockReturnValue(repository);
  });

  describe("getAllPostsFactory", () => {
    it("should create an instance of GetAllPostsUseCase", () => {
      const useCase = getAllPostsFactory();
      expect(useCase).toBeInstanceOf(GetAllPostsUseCase);
      expect(useCase['postsRepository']).toBeInstanceOf(SequelizePostsRepository);
    });
  });

  describe("getSpecificPostFactory", () => {
    it("should create an instance of GetSpecificPostUseCase", () => {
      const useCase = getSpecificPostFactory();
      expect(useCase).toBeInstanceOf(GetSpecificPostUseCase);
      expect(useCase['postsRepository']).toBeInstanceOf(SequelizePostsRepository);
    });
  });

  describe("createPostFactory", () => {
    it("should create an instance of CreatePostUseCase", () => {
      const useCase = createPostFactory();
      expect(useCase).toBeInstanceOf(CreatePostUseCase);
      expect(useCase['postsRepository']).toBeInstanceOf(SequelizePostsRepository);
    });
  });

  describe("updatePostFactory", () => {
    it("should create an instance of UpdatePostUseCase", () => {
      const useCase = updatePostFactory();
      expect(useCase).toBeInstanceOf(UpdatePostUseCase);
      expect(useCase['postsRepository']).toBeInstanceOf(SequelizePostsRepository);
    });
  });

  describe("deletePostFactory", () => {
    it("should create an instance of DeletePostUseCase", () => {
      const useCase = deletePostFactory();
      expect(useCase).toBeInstanceOf(DeletePostUseCase);
      expect(useCase['postsRepository']).toBeInstanceOf(SequelizePostsRepository);
    });
  });
});