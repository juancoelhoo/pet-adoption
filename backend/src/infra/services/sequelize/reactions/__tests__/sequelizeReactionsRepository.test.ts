import { SequelizeReactionsRepository } from '@src/infra/services/sequelize/reactions/sequelizeReactionsRepository';
import { ReactionModel } from '@src/infra/services/sequelize/reactions/reactionModel';
import { QueryError } from '@src/infra/api/errors/QueryError';
import { CreateReactionRequest } from '@src/modules/reactions/domain/entities/createReactionRequest';

jest.mock('@src/infra/services/sequelize/reactions/reactionModel');

describe('SequelizeReactionsRepository', () => {
  let repository: SequelizeReactionsRepository;

  beforeEach(() => {
    repository = new SequelizeReactionsRepository();
  });

  describe('findAll', () => {
    it('should return all reactions', async () => {
      const mockReactions = [
        { id: 1, user_id: 1, post_id: 1, created_at: new Date() },
        { id: 2, user_id: 2, post_id: 1, created_at: new Date() },
      ];
      (ReactionModel.findAll as jest.Mock).mockResolvedValue(mockReactions);

      const reactions = await repository.findAll();

      expect(reactions).toEqual([
        { id: 1, userId: 1, postId: 1, createdAt: mockReactions[0].created_at },
        { id: 2, userId: 2, postId: 1, createdAt: mockReactions[1].created_at },
      ]);
    });

    it('should throw QueryError on failure', async () => {
      (ReactionModel.findAll as jest.Mock).mockRejectedValue(new Error('Error'));

      await expect(repository.findAll()).rejects.toThrow(QueryError);
      await expect(repository.findAll()).rejects.toThrow('Error in listing reactions: Error');
    });

    it('should throw Unknown QueryError on non-Error failure', async () => {
      (ReactionModel.findAll as jest.Mock).mockRejectedValue('Unknown error');

      await expect(repository.findAll()).rejects.toThrow(QueryError);
      await expect(repository.findAll()).rejects.toThrow('Unknown error in listing reactions');
    });
  });

  describe('findOne', () => {
    it('should return a specific reaction', async () => {
      const mockReaction = { id: 1, user_id: 1, post_id: 1, created_at: new Date() };
      (ReactionModel.findOne as jest.Mock).mockResolvedValue(mockReaction);

      const reaction = await repository.findOne(1);

      expect(reaction).toEqual({ id: 1, userId: 1, postId: 1, createdAt: mockReaction.created_at });
    });

    it('should return null if reaction not found', async () => {
      (ReactionModel.findOne as jest.Mock).mockResolvedValue(null);

      const reaction = await repository.findOne(1);

      expect(reaction).toBeNull();
    });

    it('should throw QueryError on failure', async () => {
      (ReactionModel.findOne as jest.Mock).mockRejectedValue(new Error('Error'));

      await expect(repository.findOne(1)).rejects.toThrow(QueryError);
      await expect(repository.findOne(1)).rejects.toThrow('Error in listing specific reaction: Error');
    });

    it('should throw Unknown QueryError on non-Error failure', async () => {
      (ReactionModel.findOne as jest.Mock).mockRejectedValue('Unknown error');

      await expect(repository.findOne(1)).rejects.toThrow(QueryError);
      await expect(repository.findOne(1)).rejects.toThrow('Unknown error in listing specific reaction');
    });
  });

  describe('create', () => {
    it('should create a new reaction', async () => {
      const createReactionRequest: CreateReactionRequest = { userId: 1, postId: 1 };

      await repository.create(createReactionRequest);

      expect(ReactionModel.create).toHaveBeenCalledWith({ user_id: 1, post_id: 1 });
    });

    it('should throw QueryError on failure', async () => {
      (ReactionModel.create as jest.Mock).mockRejectedValue(new Error('Error'));

      await expect(repository.create({ userId: 1, postId: 1 })).rejects.toThrow(QueryError);
      await expect(repository.create({ userId: 1, postId: 1 })).rejects.toThrow('Error in creating reaction: Error');
    });

    it('should throw Unknown QueryError on non-Error failure', async () => {
      (ReactionModel.create as jest.Mock).mockRejectedValue('Unknown error');

      await expect(repository.create({ userId: 1, postId: 1 })).rejects.toThrow(QueryError);
      await expect(repository.create({ userId: 1, postId: 1 })).rejects.toThrow('Unknown error in creating reaction');
    });
  });

  describe('delete', () => {
    it('should delete a reaction', async () => {
      (ReactionModel.destroy as jest.Mock).mockResolvedValue(1);

      await repository.delete(1);

      expect(ReactionModel.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw QueryError on failure', async () => {
      (ReactionModel.destroy as jest.Mock).mockRejectedValue(new Error('Error'));

      await expect(repository.delete(1)).rejects.toThrow(QueryError);
      await expect(repository.delete(1)).rejects.toThrow('Error in deleting reaction: Error');
    });

    it('should throw Unknown QueryError on non-Error failure', async () => {
      (ReactionModel.destroy as jest.Mock).mockRejectedValue('Unknown error');

      await expect(repository.delete(1)).rejects.toThrow(QueryError);
      await expect(repository.delete(1)).rejects.toThrow('Unknown error in deleting reaction');
    });
  });

  describe('findByUserAndPost', () => {
    it('should return a reaction by user and post', async () => {
      const mockReaction = { id: 1, user_id: 1, post_id: 1, created_at: new Date() };
      (ReactionModel.findOne as jest.Mock).mockResolvedValue(mockReaction);

      const reaction = await repository.findByUserAndPost(1, 1);

      expect(reaction).toEqual({ id: 1, userId: 1, postId: 1, createdAt: mockReaction.created_at });
    });

    it('should return null if reaction not found', async () => {
      (ReactionModel.findOne as jest.Mock).mockResolvedValue(null);

      const reaction = await repository.findByUserAndPost(1, 1);

      expect(reaction).toBeNull();
    });

    it('should throw QueryError on failure', async () => {
      (ReactionModel.findOne as jest.Mock).mockRejectedValue(new Error('Error'));

      await expect(repository.findByUserAndPost(1, 1)).rejects.toThrow(QueryError);
      await expect(repository.findByUserAndPost(1, 1)).rejects.toThrow('Error in finding reaction: Error');
    });

    it('should throw Unknown QueryError on non-Error failure', async () => {
      (ReactionModel.findOne as jest.Mock).mockRejectedValue('Unknown error');

      await expect(repository.findByUserAndPost(1, 1)).rejects.toThrow(QueryError);
      await expect(repository.findByUserAndPost(1, 1)).rejects.toThrow('Unknown error in finding reaction');
    });
  });

  describe('deleteByUserAndPost', () => {
    it('should delete a reaction by user and post', async () => {
      (ReactionModel.destroy as jest.Mock).mockResolvedValue(1);

      await repository.deleteByUserAndPost(1, 1);

      expect(ReactionModel.destroy).toHaveBeenCalledWith({ where: { user_id: 1, post_id: 1 } });
    });

    it('should throw QueryError on failure', async () => {
      (ReactionModel.destroy as jest.Mock).mockRejectedValue(new Error('Error'));

      await expect(repository.deleteByUserAndPost(1, 1)).rejects.toThrow(QueryError);
      await expect(repository.deleteByUserAndPost(1, 1)).rejects.toThrow('Error in deleting reaction: Error');
    });

    it('should throw Unknown QueryError on non-Error failure', async () => {
      (ReactionModel.destroy as jest.Mock).mockRejectedValue('Unknown error');

      await expect(repository.deleteByUserAndPost(1, 1)).rejects.toThrow(QueryError);
      await expect(repository.deleteByUserAndPost(1, 1)).rejects.toThrow('Unknown error in deleting reaction');
    });
  });

  describe('findAllByPostId', () => {
    it('should return all reactions by post ID', async () => {
      const mockReactions = [
        { id: 1, user_id: 1, post_id: 1, created_at: new Date() },
        { id: 2, user_id: 2, post_id: 1, created_at: new Date() },
      ];
      (ReactionModel.findAll as jest.Mock).mockResolvedValue(mockReactions);

      const reactions = await repository.findAllByPostId(1);

      expect(reactions).toEqual([
        { id: 1, userId: 1, postId: 1, createdAt: mockReactions[0].created_at },
        { id: 2, userId: 2, postId: 1, createdAt: mockReactions[1].created_at },
      ]);
    });

    it('should throw QueryError on failure', async () => {
      (ReactionModel.findAll as jest.Mock).mockRejectedValue(new Error('Error'));

      await expect(repository.findAllByPostId(1)).rejects.toThrow(QueryError);
      await expect(repository.findAllByPostId(1)).rejects.toThrow('Error in listing reactions by post ID: Error');
    });

    it('should throw Unknown QueryError on non-Error failure', async () => {
      (ReactionModel.findAll as jest.Mock).mockRejectedValue('Unknown error');

      await expect(repository.findAllByPostId(1)).rejects.toThrow(QueryError);
      await expect(repository.findAllByPostId(1)).rejects.toThrow('Unknown error in listing reactions by post ID');
    });
  });
});
