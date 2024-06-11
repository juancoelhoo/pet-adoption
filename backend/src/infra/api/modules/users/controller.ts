import { CreateUserRequest } from "@src/modules/users/domain/entities/createUserRequest";
import { UpdateUserRequest } from "@src/modules/users/domain/entities/updateUserRequest";
import { createUserFactory, deleteUserFactory, getAllUsersFactory, getSpecificUserFactory, updateUserFactory } from "@src/modules/users/factory";
import { Request, Response, NextFunction } from "express";
import { InvalidParamError } from "../../errors/InvalidParamError";
import { QueryError } from "../../errors/QueryError";

class UsersController {
  /**
   * @swagger
   * /users/all:
   *   get:
   *     summary: Returns the list of all the users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: The list of the users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const usersFactory = getAllUsersFactory();

      const users = await usersFactory.execute();

      return res.status(200).json({
        message: "Users listed successfully!",
        body: users,
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
   * /users/{id}:
   *   get:
   *     summary: Returns the information of a specific user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The user id
   *     responses:
   *       200:
   *         description: The information of the specified user
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new InvalidParamError("Missing property 'id'!");

      const usersFactory = getSpecificUserFactory();

      const user = await usersFactory.execute(Number(id));

      return res.status(200).json({
        message: "User listed successfully!",
        body: user,
      });
    } catch (error) {
      if (error instanceof InvalidParamError) {
        return res.status(400).json({ error: error.message });
      }
      if (error instanceof QueryError) {
        return res.status(404).json({ error: "User not found" });
      }
      return next(error);
    }
  }

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       201:
   *         description: The user was created successfully
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const usersFactory = createUserFactory();

      const user: Required<CreateUserRequest> = req.body;

      await usersFactory.execute(user);

      return res.status(201).json({
        message: "User created successfully!"
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
   * /users/{id}:
   *   put:
   *     summary: Update an existing user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The user id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description: The user was updated successfully
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new InvalidParamError("Missing property 'id'!");

      const usersFactory = updateUserFactory();

      const { email, id: bodyId, ...user }: UpdateUserRequest = req.body; // Excluir `email` e `id` do corpo da requisição

      await usersFactory.execute({ ...user, id: Number(id) });

      return res.status(200).json({
        message: "User updated successfully!"
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
   * /users/{id}:
   *   delete:
   *     summary: Deletes a specified user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The user id
   *     responses:
   *       200:
   *         description: The specified user was deleted
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new InvalidParamError("Missing property 'id'!");

      const usersFactory = deleteUserFactory();

      await usersFactory.execute(Number(id));

      return res.status(200).json({
        message: "User deleted successfully!"
      });
    } catch (error) {
      if (error instanceof InvalidParamError) {
        return res.status(400).json({ error: error.message });
      }
      if (error instanceof QueryError) {
        return res.status(404).json({ error: "User not found" });
      }
      return next(error);
    }
  }
}

export default new UsersController();
