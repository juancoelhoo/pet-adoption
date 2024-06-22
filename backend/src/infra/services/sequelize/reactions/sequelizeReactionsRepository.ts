import { ReactionsRepository } from "@src/modules/reactions/domain/interfaces/reactionsRepository";
import { Reaction } from "@src/modules/reactions/domain/entities/reaction";
import { CreateReactionRequest } from "@src/modules/reactions/domain/entities/createReactionRequest";
import { ReactionModel } from "./reactionModel";
import { QueryError } from "@src/infra/api/errors/QueryError";

export class SequelizeReactionsRepository implements ReactionsRepository {
  async findAll(): Promise<Reaction[]> {
    try {
      const reactions: ReactionModel[] = await ReactionModel.findAll();
      return reactions.map(reaction => ({
        id: reaction.id,
        userId: reaction.user_id,
        postId: reaction.post_id,
        createdAt: reaction.created_at,
      }));
    } catch (error) {
      if (error instanceof Error) {
        throw new QueryError("Error in listing reactions: " + error.message);
      } else {
        throw new QueryError("Unknown error in listing reactions");
      }
    }
  }

  async findOne(id: number): Promise<Reaction | null> {
    try {
      const reaction = await ReactionModel.findOne({
        where: {
          id: id
        }
      });

      if (reaction == null) return null;

      return {
        id: reaction.id,
        userId: reaction.user_id,
        postId: reaction.post_id,
        createdAt: reaction.created_at,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new QueryError("Error in listing specific reaction: " + error.message);
      } else {
        throw new QueryError("Unknown error in listing specific reaction");
      }
    }
  }

  async create(reaction: CreateReactionRequest): Promise<void> {
    try {
      await ReactionModel.create({
        user_id: reaction.userId,
        post_id: reaction.postId,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new QueryError("Error in creating reaction: " + error.message);
      } else {
        throw new QueryError("Unknown error in creating reaction");
      }
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await ReactionModel.destroy({
        where: {
          id: id
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new QueryError("Error in deleting reaction: " + error.message);
      } else {
        throw new QueryError("Unknown error in deleting reaction");
      }
    }
  }

  async findByUserAndPost(userId: number, postId: number): Promise<Reaction | null> {
    try {
      const reaction = await ReactionModel.findOne({
        where: {
          user_id: userId,
          post_id: postId
        }
      });

      if (reaction == null) return null;

      return {
        id: reaction.id,
        userId: reaction.user_id,
        postId: reaction.post_id,
        createdAt: reaction.created_at,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new QueryError("Error in finding reaction: " + error.message);
      } else {
        throw new QueryError("Unknown error in finding reaction");
      }
    }
  }

  async deleteByUserAndPost(userId: number, postId: number): Promise<void> {
    try {
      await ReactionModel.destroy({
        where: {
          user_id: userId,
          post_id: postId
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new QueryError("Error in deleting reaction: " + error.message);
      } else {
        throw new QueryError("Unknown error in deleting reaction");
      }
    }
  }
}