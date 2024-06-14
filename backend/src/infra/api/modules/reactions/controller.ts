import { createReactionFactory, deleteReactionFactory, getAllReactionsFactory, getSpecificReactionFactory } from "@src/modules/reactions/factory";
import { Request, Response, NextFunction } from "express";
import { InvalidParamError } from "../../errors/InvalidParamError";
import { QueryError } from "../../errors/QueryError";

class ReactionsController {
  /**
   * @swagger
   * /reactions/all:
   *   get:
   *     summary: Returns the list of all the reactions
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
      const reactionsFactory = createReactionFactory();
      const reaction = req.body;
      await reactionsFactory.execute(reaction);

      return res.status(201).json({
        message: "Reaction created successfully!"
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
}

export default new ReactionsController();
