import { getAllExamplesFactory } from "@src/modules/examples/factory";
import { Request, Response, NextFunction } from "express";

class ExamplesController {
  /**
   * @swagger
   * /examples/all:
   *   get:
   *     summary: Returns the list of all the examples
   *     tags: [Examples]
   *     responses:
   *       200:
   *         description: The list of the examples
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Example'
   */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const examplesFactory = getAllExamplesFactory();

      const examples = await examplesFactory.execute();

      return res.status(200).json({
        message: "Examples listed successfully!",
        body: examples,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new ExamplesController();
