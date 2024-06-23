import { Router } from "express";

import filesController from "./controller";
import { storage } from "../../config/storage/storageSetup";
import { verifyJWT } from "../../middlewares/auth";

const router = Router();

router.post("/upload", verifyJWT, storage.single("file"), filesController.uploadFile);

export default router;
