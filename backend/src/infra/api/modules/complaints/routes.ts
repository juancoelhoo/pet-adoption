import { Router } from "express";
import complaintsController from "./controller";
import { verifyJWT } from "../../middlewares/auth";

/**
 * @swagger
 * tags:
 *   name: Complaints
 *   description: Complaints in the system
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Complaint:
 *       type: object
 *       required:
 *         - reporterUserId
 *         - reportedPostId
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the complaint
 *         reporterUserId:
 *           type: number
 *           description: The ID of the user who reported
 *         reportedPostId:
 *           type: number
 *           description: The ID of the post that was reported
 *         reason:
 *           type: string
 *           description: The reason for the complaint
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time when the complaint was created
 *       example:
 *         id: 1
 *         reporterUserId: 123
 *         reportedPostId: 456
 *         reason: "Inappropriate content"
 *         createdAt: "2023-06-15T00:00:00Z"
 */

const router = Router();

router.get("/all", verifyJWT, complaintsController.getAll);
router.get("/:id", verifyJWT, complaintsController.getOne);
router.post("/", verifyJWT, complaintsController.create);
router.put("/:id", verifyJWT, complaintsController.update); 
router.delete("/:id", verifyJWT, complaintsController.delete);

export default router;
