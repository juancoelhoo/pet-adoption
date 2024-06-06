import { CreatePostRequest } from "@src/modules/posts/domain/entities/createPostRequest";
import { UpdatePostRequest } from "@src/modules/posts/domain/entities/updatePostRequest";
import { createPostFactory, deletePostFactory, getAllPostsFactory, getSpecificPostFactory, updatePostFactory } from "@src/modules/posts/factory";
import { Request, Response, NextFunction } from "express";

class PostsController {
  /**
   * @swagger
   * /posts/all:
   *   get:
   *     summary: Returns the list of all the posts
   *     tags: [Posts]
   *     responses:
   *       200:
   *         description: The list of the posts
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Post'
   */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const postsFactory = getAllPostsFactory();

      const posts = await postsFactory.execute();

      return res.status(200).json({
        message: "Posts listed successfully!",
        body: posts,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /posts/{id}:
   *   get:
   *     summary: Returns the an specific post
   *     tags: [Posts]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The post id
   *     responses:
   *       200:
   *         description: The information of the specified post
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Post'
   */
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new Error("Missing property 'id'!");

      const postsFactory = getSpecificPostFactory();

      const post = await postsFactory.execute(Number(id));

      return res.status(200).json({
        message: "Post listed successfully!",
        body: post,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /posts:
   *   post:
   *     summary: Create the desired post
   *     tags: [Posts]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Post'
   *     responses:
   *       201:
   *         description: The post was created successfully
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const postsFactory = createPostFactory();

      const post: Required<CreatePostRequest> = req.body;

      await postsFactory.execute(post);

      return res.status(201).json({
        message: "Post created successfully!"
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /posts:
   *   put:
   *     summary: Update the desired post
   *     tags: [Posts]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Post'
   *     responses:
   *       200:
   *         description: The post was updated successfully
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const postsFactory = updatePostFactory();

      const post: Required<UpdatePostRequest> = req.body;

      await postsFactory.execute(post);

      return res.status(200).json({
        message: "Post updated successfully!"
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /posts/{id}:
   *   delete:
   *     summary: Deletes the specified post
   *     tags: [Posts]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The post id
   *     responses:
   *       200:
   *         description: The specified post was deleted
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new Error("Missing property 'id'!");

      const postsFactory = deletePostFactory();

      await postsFactory.execute(Number(id));

      return res.status(200).json({
        message: "Post deleted successfully!"
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new PostsController();
