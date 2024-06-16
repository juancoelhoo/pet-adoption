import { createReactionFactory, deleteReactionFactory, getAllReactionsFactory, getSpecificReactionFactory } from "@src/modules/reactions/factory";
import { Request, Response, NextFunction } from "express";
import { InvalidParamError } from "../../errors/InvalidParamError";
import { QueryError } from "../../errors/QueryError";
import { SequelizeReactionsRepository } from "@src/infra/services/sequelize/reactions/sequelizeReactionsRepository";

class ReactionsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const reactionsFactory = getAllReactionsFactory();
      const reactions = await reactionsFactory.execute();
      return res.status(200).json({
        message: "Reactions listed successfully!",
        body: reactions,
      });
    } catch (error) {
      if (error instanceof QueryError) {
        return res.status(400).json({ error: error.message });
      }
      return next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) throw new InvalidParamError("Missing property 'id'!");

      const reactionsFactory = getSpecificReactionFactory();
      const reaction = await reactionsFactory.execute(Number(id));

      return res.status(200).json({
        message: "Reaction listed successfully!",
        body: reaction,
      });
    } catch (error) {
      if (error instanceof InvalidParamError) {
        return res.status(400).json({ error: error.message });
      }
      if (error instanceof QueryError) {
        return res.status(404).json({ error: "Reaction not found" });
      }
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, postId } = req.body;
      const reactionsFactory = createReactionFactory();

      const reaction = await reactionsFactory.execute({ userId, postId });

      return res.status(201).json({
        message: "Reaction created successfully!",
        body: reaction
      });
    } catch (error) {
      if (error instanceof InvalidParamError || error instanceof QueryError) {
        return res.status(400).json({ error: error.message });
      }
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) throw new InvalidParamError("Missing property 'id'!");

      const reactionsFactory = deleteReactionFactory();
      await reactionsFactory.execute(Number(id));

      return res.status(200).json({
        message: "Reaction deleted successfully!"
      });
    } catch (error) {
      if (error instanceof InvalidParamError) {
        return res.status(400).json({ error: error.message });
      }
      if (error instanceof QueryError) {
        return res.status(404).json({ error: "Reaction not found" });
      }
      return next(error);
    }
  }

  async toggleLike(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, postId } = req.body;
      const reactionsRepository = new SequelizeReactionsRepository();
      const existingReaction = await reactionsRepository.findByUserAndPost(userId, postId);

      if (existingReaction) {
        await reactionsRepository.deleteByUserAndPost(userId, postId);
        return res.status(200).json({
          message: "Like removed successfully!"
        });
      } else {
        await reactionsRepository.create({ userId, postId });
        return res.status(201).json({
          message: "Like added successfully!"
        });
      }
    } catch (error) {
      if (error instanceof InvalidParamError || error instanceof QueryError) {
        return res.status(400).json({ error: error.message });
      }
      return next(error);
    }
  }
}

export default new ReactionsController();