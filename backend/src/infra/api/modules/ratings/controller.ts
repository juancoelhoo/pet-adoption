import { Request, Response, NextFunction } from "express";
import { CreateRatingRequest } from "@src/modules/ratings/domain/entities/createRatingRequest";
import { UpdateRatingRequest } from "@src/modules/ratings/domain/entities/updateRatingRequest";
import { createRatingFactory, deleteRatingFactory, getAllRatingsFactory, getSpecificRatingFactory, updateRatingFactory, calculateUserAverageRatingFactory } from "@src/modules/ratings/factory";

class RatingsController {
  /**
   * @swagger
   * /ratings/all:
   *   get:
   *     summary: Returns the list of all the ratings
   *     tags: [Ratings]
   *     responses:
   *       200:
   *         description: The list of the ratings
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Rating'
   */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const ratingsFactory = getAllRatingsFactory();

      const ratings = await ratingsFactory.execute();

      return res.status(200).json({
        message: "Ratings listed successfully!",
        body: ratings,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /ratings/{id}:
   *   get:
   *     summary: Returns the details of a specific rating
   *     tags: [Ratings]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The rating id
   *     responses:
   *       200:
   *         description: The details of the specified rating
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Rating'
   */
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new Error("Missing property 'id'!");

      const ratingsFactory = getSpecificRatingFactory();

      const rating = await ratingsFactory.execute(Number(id));

      if (!rating) {
        return res.status(404).json({
          message: "Rating not found!",
        });
      }

      return res.status(200).json({
        message: "Rating listed successfully!",
        body: rating,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /ratings:
   *   post:
   *     summary: Create a new rating
   *     tags: [Ratings]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Rating'
   *     responses:
   *       201:
   *         description: The rating was created successfully
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const ratingsFactory = createRatingFactory();

      const rating: Required<CreateRatingRequest> = req.body;

      await ratingsFactory.execute(rating);

      return res.status(201).json({
        message: "Rating created successfully!"
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /ratings/{id}:
   *   put:
   *     summary: Update an existing rating
   *     tags: [Ratings]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The rating id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Rating'
   *     responses:
   *       200:
   *         description: The rating was updated successfully
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) throw new Error("Missing property 'id'!");

      const ratingsFactory = getSpecificRatingFactory();
      const existingRating = await ratingsFactory.execute(Number(id));

      if (!existingRating) {
        return res.status(404).json({
          message: "Rating not found!",
        });
      }

      const updateFactory = updateRatingFactory();
      const rating: Required<UpdateRatingRequest> = { ...req.body, id: Number(id) };

      await updateFactory.execute(rating);

      return res.status(200).json({
        message: "Rating updated successfully!"
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /ratings/{id}:
   *   delete:
   *     summary: Deletes a specific rating
   *     tags: [Ratings]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The rating id
   *     responses:
   *       200:
   *         description: The rating was deleted successfully
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) throw new Error("Missing property 'id'!");

      const ratingsFactory = getSpecificRatingFactory();
      const existingRating = await ratingsFactory.execute(Number(id));

      if (!existingRating) {
        return res.status(404).json({
          message: "Rating not found!",
        });
      }

      const deleteFactory = deleteRatingFactory();
      await deleteFactory.execute(Number(id));

      return res.status(200).json({
        message: "Rating deleted successfully!"
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /ratings/average/{userId}:
   *   get:
   *     summary: Calculates the average rating of a user
   *     tags: [Ratings]
   *     parameters:
   *       - in: path
   *         name: userId
   *         schema:
   *           type: number
   *         required: true
   *         description: The user id
   *     responses:
   *       200:
   *         description: The average rating of the user
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 average:
   *                   type: number
   *                   description: The average rating
   *                   example: 4.5
   */
  async calculateAverage(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      if (!userId) throw new Error("Missing property 'userId'!");

      const ratingsFactory = calculateUserAverageRatingFactory();

      const average = await ratingsFactory.execute(Number(userId));

      return res.status(200).json({
        message: "User average rating calculated successfully!",
        body: { average },
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new RatingsController();