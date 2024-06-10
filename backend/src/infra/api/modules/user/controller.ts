import { CreateUserRequest } from "@src/modules/users/domain/entities/createUserRequest";
import { UpdateUserRequest } from "@src/modules/users/domain/entities/updateUserRequest";
import { createUserFactory, deleteUserFactory, getAllUsersFactory, getSpecificUserFactory, updateUserFactory } from "@src/modules/users/factory";
import { Request, Response, NextFunction } from "express";

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

      if (!id) throw new Error("Missing property 'id'!");

      const usersFactory = getSpecificUserFactory();

      const user = await usersFactory.execute(Number(id));

      return res.status(200).json({
        message: "User listed successfully!",
        body: user,
      });
    } catch (error) {
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
      return next(error);
    }
  }

  /**
   * @swagger
   * /users:
   *   put:
   *     summary: Update an existing user
   *     tags: [Users]
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
      const usersFactory = updateUserFactory();

      const user: Required<UpdateUserRequest> = req.body;

      await usersFactory.execute(user);

      return res.status(200).json({
        message: "User updated successfully!"
      });
    } catch (error) {
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

      if (!id) throw new Error("Missing property 'id'!");

      const usersFactory = deleteUserFactory();

      await usersFactory.execute(Number(id));

      return res.status(200).json({
        message: "User deleted successfully!"
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new UsersController();