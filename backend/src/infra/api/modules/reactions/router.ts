import { Router } from "express";
import reactionsController from "./controller";
import { verifyJWT } from "../../middlewares/auth";

/**
 * @swagger
 * tags:
 *   name: Reactions
 *   description: Reactions in the system
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reaction:
 *       type: object
 *       required:
 *         - userId
 *         - postId
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the reaction
 *         userId:
 *           type: number
 *           description: The ID of the user who reacted
 *         postId:
 *           type: number
 *           description: The ID of the post that was reacted to
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time when the reaction was created
 *       example:
 *         id: 1
 *         userId: 123
 *         postId: 456
 *         createdAt: "2023-06-15T00:00:00Z"
 */

const router = Router();

router.get("/all", verifyJWT, reactionsController.getAll);
router.get("/:id", verifyJWT, reactionsController.getOne);
router.post("/", verifyJWT, reactionsController.create);
router.delete("/:id", verifyJWT, reactionsController.delete);

export default router;
