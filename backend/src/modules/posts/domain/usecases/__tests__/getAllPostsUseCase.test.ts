import { mock, MockProxy } from 'jest-mock-extended';
import { GetAllPostsUseCase } from '../getAllPostsUseCase';
import { PostsRepository } from '../../interfaces/postsRepository';
import { Post } from '../../entities/post';

describe('GetAllPostsUseCase', () => {
  let useCase: GetAllPostsUseCase;
  let postsRepository: MockProxy<PostsRepository>;

  beforeEach(() => {
    postsRepository = mock<PostsRepository>();
    useCase = new GetAllPostsUseCase(postsRepository);
  });

  it('should return all posts', async () => {
    const posts: Post[] = [
      {
        id: 1,
        name: 'Name 1',
        breed: 'Breed 1',
        photoUrl: 'https://site.com/link.png',
        age: 7,
        description: 'Description 1',
        ownerId: 2,
        createdAt: new Date()
      },
    ];
    postsRepository.findAll.mockResolvedValue(posts);

    const result = await useCase.execute();

    expect(result).toEqual(posts);
    expect(postsRepository.findAll).toHaveBeenCalled();
  });
});
