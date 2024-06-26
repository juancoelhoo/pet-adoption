import { createReactionFactory, deleteReactionFactory, getAllReactionsFactory, getSpecificReactionFactory, getAllReactionsByPostIdFactory } from "@src/modules/reactions/factory";
import { Request, Response, NextFunction } from "express";
import { InvalidParamError } from "../../errors/InvalidParamError";
import { QueryError } from "../../errors/QueryError";
import { SequelizeReactionsRepository } from "@src/infra/services/sequelize/reactions/sequelizeReactionsRepository";

class ReactionsController {
  /**
   * @swagger
   * /reactions:
   *   get:
   *     summary: Returns the list of all reactions
   *     tags: [Reactions]
   *     responses:
   *       200:
   *         description: The list of the reactions
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Reaction'
   */
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

  /**
   * @swagger
   * /reactions/{id}:
   *   get:
   *     summary: Returns the information of a specific reaction
   *     tags: [Reactions]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The reaction id
   *     responses:
   *       200:
   *         description: The information of the specified reaction
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Reaction'
   */
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

  /**
   * @swagger
   * /reactions:
   *   post:
   *     summary: Create a new reaction
   *     tags: [Reactions]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Reaction'
   *     responses:
   *       201:
   *         description: The reaction was created successfully
   */
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

  /**
   * @swagger
   * /reactions/{id}:
   *   delete:
   *     summary: Deletes a specified reaction
   *     tags: [Reactions]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The reaction id
   *     responses:
   *       200:
   *         description: The specified reaction was deleted
   */
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

  /**
   * @swagger
   * /reactions/post/{postId}:
   *   get:
   *     summary: Returns all reactions for a specific post
   *     tags: [Reactions]
   *     parameters:
   *       - in: path
   *         name: postId
   *         schema:
   *           type: number
   *         required: true
   *         description: The post id
   *     responses:
   *       200:
   *         description: The list of reactions for the specified post
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Reaction'
   */
  async getAllByPostId(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params;
      if (!postId) throw new InvalidParamError("Missing property 'postId'!");

      const reactionsFactory = getAllReactionsByPostIdFactory();
      const reactions = await reactionsFactory.execute(Number(postId));

      return res.status(200).json({
        message: "Reactions listed successfully!",
        body: reactions,
      });
    } catch (error) {
      if (error instanceof InvalidParamError) {
        return res.status(400).json({ error: error.message });
      }
      if (error instanceof QueryError) {
        return res.status(404).json({ error: "Reactions not found" });
      }
      return next(error);
    }
  }

  /**
   * @swagger
   * /reactions/toggleLike:
   *   post:
   *     summary: Toggles a like reaction for a post by a user
   *     tags: [Reactions]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               userId:
   *                 type: number
   *                 description: The ID of the user
   *               postId:
   *                 type: number
   *                 description: The ID of the post
   *     responses:
   *       200:
   *         description: Like removed successfully
   *       201:
   *         description: Like added successfully
   */
  async toggleLike(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, postId } = req.body;
      if (!userId || !postId) throw new InvalidParamError("Missing property 'userId' or 'postId'!");

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

  /**
   * @swagger
   * /reactions/total/{postId}:
   *   get:
   *     summary: Returns the total number of reactions for a specific post
   *     tags: [Reactions]
   *     parameters:
   *       - in: path
   *         name: postId
   *         schema:
   *           type: number
   *         required: true
   *         description: The post id
   *     responses:
   *       200:
   *         description: The total number of reactions for the specified post
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 total:
   *                   type: number
   *                   description: The total number of reactions
   *                   example: 5
   */
  async getTotalReactionsByPostId(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params;
      if (!postId) throw new InvalidParamError("Missing property 'postId'!");

      const reactionsFactory = getAllReactionsByPostIdFactory();
      const reactions = await reactionsFactory.execute(Number(postId));
      const totalReactions = reactions.length;

      return res.status(200).json({
        message: "Total reactions calculated successfully!",
        body: { total: totalReactions },
      });
    } catch (error) {
      if (error instanceof InvalidParamError) {
        return res.status(400).json({ error: error.message });
      }
      if (error instanceof QueryError) {
        return res.status(404).json({ error: "Reactions not found" });
      }
      return next(error);
    }
  }
}

export default new ReactionsController();
