import { Request, Response, NextFunction } from "express";
import { createComplaintFactory, deleteComplaintFactory, getAllComplaintsFactory, getSpecificComplaintFactory, updateComplaintFactory } from "@src/modules/complaints/factory";
import { InvalidParamError } from "../../errors/InvalidParamError";
import { QueryError } from "../../errors/QueryError";

class ComplaintsController {
  /**
   * @swagger
   * /complaints:
   *   get:
   *     summary: Returns the list of all complaints
   *     tags: [Complaints]
   *     responses:
   *       200:
   *         description: The list of the complaints
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Complaint'
   */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const complaintsFactory = getAllComplaintsFactory();
      const complaints = await complaintsFactory.execute();
      return res.status(200).json({
        message: "Complaints listed successfully!",
        body: complaints,
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
   * /complaints/{id}:
   *   get:
   *     summary: Returns the information of a specific complaint
   *     tags: [Complaints]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The complaint id
   *     responses:
   *       200:
   *         description: The information of the specified complaint
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Complaint'
   */
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) throw new InvalidParamError("Missing property 'id'!");

      const complaintsFactory = getSpecificComplaintFactory();
      const complaint = await complaintsFactory.execute(Number(id));

      return res.status(200).json({
        message: "Complaint listed successfully!",
        body: complaint,
      });
    } catch (error) {
      if (error instanceof InvalidParamError) {
        return res.status(400).json({ error: error.message });
      }
      if (error instanceof QueryError) {
        return res.status(404).json({ error: "Complaint not found" });
      }
      return next(error);
    }
  }

  /**
   * @swagger
   * /complaints:
   *   post:
   *     summary: Create a new complaint
   *     tags: [Complaints]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Complaint'
   *     responses:
   *       201:
   *         description: The complaint was created successfully
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const complaintsFactory = createComplaintFactory();
      const complaint = req.body;
      await complaintsFactory.execute(complaint);

      return res.status(201).json({
        message: "Complaint created successfully!"
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
   * /complaints/{id}:
   *   put:
   *     summary: Update an existing complaint
   *     tags: [Complaints]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The complaint id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Complaint'
   *     responses:
   *       200:
   *         description: The complaint was updated successfully
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) throw new InvalidParamError("Missing property 'id'!");

      const complaint = req.body;
      const complaintsFactory = updateComplaintFactory();
      await complaintsFactory.execute(Number(id), complaint);

      return res.status(200).json({
        message: "Complaint updated successfully!"
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
   * /complaints/{id}:
   *   delete:
   *     summary: Deletes a specified complaint
   *     tags: [Complaints]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The complaint id
   *     responses:
   *       200:
   *         description: The specified complaint was deleted
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) throw new InvalidParamError("Missing property 'id'!");

      const complaintsFactory = deleteComplaintFactory();
      await complaintsFactory.execute(Number(id));

      return res.status(200).json({
        message: "Complaint deleted successfully!"
      });
    } catch (error) {
      if (error instanceof InvalidParamError) {
        return res.status(400).json({ error: error.message });
      }
      if (error instanceof QueryError) {
        return res.status(404).json({ error: "Complaint not found" });
      }
      return next(error);
    }
  }
}

export default new ComplaintsController();
