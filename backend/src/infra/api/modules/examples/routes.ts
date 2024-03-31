import { Router } from "express";

import examplesController from "./controller";

/**
 * @swagger
 * tags:
 *   name: Examples
 *   description: Template for Pet Adoption project
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Example:
 *       type: object
 *       required:
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the example
 *         description:
 *           type: string
 *           description: The example description
 *       example:
 *         id: 1618651548
 *         description: The example description
 */

const router = Router();

router.get("/all", examplesController.getAll);

export default router;
