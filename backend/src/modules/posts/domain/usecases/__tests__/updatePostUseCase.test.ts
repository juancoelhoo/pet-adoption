import { mock, MockProxy } from 'jest-mock-extended';
import { UpdatePostUseCase } from '../updatePostUseCase';
import { PostsRepository } from '../../interfaces/postsRepository';
import { UpdatePostRequest } from '../../entities/updatePostRequest';

describe('UpdatePostUseCase', () => {
  let useCase: UpdatePostUseCase;
  let postsRepository: MockProxy<PostsRepository>;

  beforeEach(() => {
    postsRepository = mock<PostsRepository>();
    useCase = new UpdatePostUseCase(postsRepository);
  });

  it('should update a post', async () => {
    const postId = 1;
    const post: UpdatePostRequest = {
      id: postId,
      name: 'Name 1',
      breed: 'Breed 1',
      photoUrl: 'https://site.com/link.png',
      age: 7,
      description: 'Description 1',
      ownerId: 2,
    };

    await useCase.execute(post);

    expect(postsRepository.update).toHaveBeenCalledWith(postId, post);
  });
});
