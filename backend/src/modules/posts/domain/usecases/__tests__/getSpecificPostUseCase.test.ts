import { mock, MockProxy } from 'jest-mock-extended';
import { GetSpecificPostUseCase } from '../getSpecificPostUseCase';
import { PostsRepository } from '../../interfaces/postsRepository';
import { Post } from '../../entities/post';

describe('GetSpecificPostUseCase', () => {
  let useCase: GetSpecificPostUseCase;
  let postsRepository: MockProxy<PostsRepository>;

  beforeEach(() => {
    postsRepository = mock<PostsRepository>();
    useCase = new GetSpecificPostUseCase(postsRepository);
  });

  it('should return the specific Post if found', async () => {
    const postId = 1;
    const post: Post = {
      id: 1,
      name: 'Name 1',
      breed: 'Breed 1',
      photoUrl: 'https://site.com/link.png',
      age: 7,
      description: 'Description 1',
      ownerId: 2,
      createdAt: new Date()
    };
    postsRepository.findOne.mockResolvedValue(post);

    const result = await useCase.execute(postId);

    expect(result).toEqual(post);
    expect(postsRepository.findOne).toHaveBeenCalledWith(postId);
  });

  it('should throw an error if the post is not found', async () => {
    const postId = 1;
    postsRepository.findOne.mockResolvedValue(null);

    await expect(useCase.execute(postId)).rejects.toThrow('This post does not exist!');
  });
});
