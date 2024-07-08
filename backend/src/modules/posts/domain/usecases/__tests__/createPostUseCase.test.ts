import { mock, MockProxy } from 'jest-mock-extended';
import { CreatePostUseCase } from '../createPostUseCase';
import { PostsRepository } from '../../interfaces/postsRepository';
import { CreatePostRequest } from '../../entities/createPostRequest';

describe('CreatePostUseCase', () => {
  let useCase: CreatePostUseCase;
  let postsRepository: MockProxy<PostsRepository>;

  beforeEach(() => {
    postsRepository = mock<PostsRepository>();
    useCase = new CreatePostUseCase(postsRepository);
  });

  it('should create a new post', async () => {
    const request: CreatePostRequest = {
      name: 'Name 1',
      breed: 'Breed 1',
      photoUrl: 'https://site.com/link.png',
      age: 7,
      description: 'Description 1',
      ownerId: 2,
      createdAt: new Date().toISOString()
    };

    await useCase.execute(request);

    expect(postsRepository.create).toHaveBeenCalledWith({
      ...request,
      createdAt: new Date(request.createdAt)
    });
  });
});
