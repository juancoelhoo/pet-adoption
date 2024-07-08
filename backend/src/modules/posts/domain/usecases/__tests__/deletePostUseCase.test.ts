import { mock, MockProxy } from 'jest-mock-extended';
import { DeletePostUseCase } from '../deletePostUseCase';
import { PostsRepository } from '../../interfaces/postsRepository';

describe('DeletePostUseCase', () => {
  let useCase: DeletePostUseCase;
  let postsRepository: MockProxy<PostsRepository>;

  beforeEach(() => {
    postsRepository = mock<PostsRepository>();
    useCase = new DeletePostUseCase(postsRepository);
  });

  it('should delete a post by id', async () => {
    const postId = 1;

    await useCase.execute(postId);

    expect(postsRepository.delete).toHaveBeenCalledWith(postId);
  });
});
