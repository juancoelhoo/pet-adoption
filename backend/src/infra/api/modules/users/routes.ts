import { Router } from "express";
import usersController from "./controller";
import { verifyJWT, login, notLoggedIn, checkPermission, logout } from "../../middlewares/auth";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users in the system
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         profilePhoto:
 *           type: string
 *           description: The URL of the user's profile photo
 *         description:
 *           type: string
 *           description: A short description of the user
 *         address:
 *           type: string
 *           description: The address of the user
 *         phone:
 *           type: string
 *           description: The phone number of the user
 *         permissions:
 *           type: number
 *           description: The permissions level of the user
 *       example:
 *         id: 1618651548
 *         name: John Doe
 *         email: johndoe@example.com
 *         password: "password123"
 *         profilePhoto: "https://i.imgur.com/z9sCEqU.jpeg"
 *         description: "A brief description about John Doe."
 *         address: "123 Main St"
 *         phone: "123-456-7890"
 *         permissions: 1
 */

const router = Router();

router.post("/login", notLoggedIn, login);
router.post("/logout", logout);

router.get("/all", verifyJWT, usersController.getAll);
router.get("/:id", verifyJWT, usersController.getOne);
router.post("/", usersController.create);
router.put("/:id", verifyJWT, usersController.update); 
router.delete("/:id", verifyJWT, checkPermission(1), usersController.delete);

export default router;
