import { Router } from "express";

import postsController from "./controller";

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Pets posts associated to a user
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the example
 *         name:
 *           type: string
 *           description: The name of the pet
 *         description:
 *           type: string
 *           description: The post description
 *         breed:
 *           type: string
 *           description: The breed of the pet
 *         photoUrl:
 *           type: string
 *           description: The url hosting the post photo
 *         age:
 *           type: number
 *           description: The age of the pet
 *         createdAt:
 *           type: string
 *           description: The creation date of the post
 *         ownerId:
 *           type: number
 *           description: The ID associated to the post owner
 *       example:
 *         id: 1618651548
 *         name: John Doe
 *         description: Post description
 *         breed: Rottweiler
 *         photoUrl: https://i.imgur.com/z9sCEqU.jpeg
 *         age: 5
 *         createdAt: 2019-04-21 21:14:08
 *         ownerId: 1
 */

const router = Router();

router.get("/all", postsController.getAll);
router.get("/:id", postsController.getOne);
router.post("/", postsController.create);
router.put("/", postsController.update);
router.delete("/:id", postsController.delete);

export default router;
