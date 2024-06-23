import { Router } from "express";
import ratingsController from "./controller";
import { verifyJWT } from "../../middlewares/auth";

/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: Ratings given by users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Rating:
 *       type: object
 *       required:
 *         - grade
 *         - reporterUserId
 *         - reportedUserId
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the rating
 *         grade:
 *           type: number
 *           description: The rating grade
 *         reporterUserId:
 *           type: number
 *           description: The ID of the user who reported the rating
 *         reportedUserId:
 *           type: number
 *           description: The ID of the user being rated
 *         createdAt:
 *           type: string
 *           description: The creation date of the rating
 *       example:
 *         id: 1
 *         grade: 5
 *         reporterUserId: 1
 *         reportedUserId: 2
 *         createdAt: 2023-06-23T14:00:00.000Z
 */

const router = Router();

router.get("/all", ratingsController.getAll);
router.get("/:id", ratingsController.getOne);
router.post("/", verifyJWT, ratingsController.create);
router.put("/:id", verifyJWT, ratingsController.update);
router.delete("/:id", verifyJWT, ratingsController.delete);
router.get("/average/:userId", ratingsController.calculateAverage);

export default router;
