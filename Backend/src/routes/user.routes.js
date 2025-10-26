import express from "express";
import { userProfile } from "../controllers/userProfile.controller.js";
import { userAuthMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:id", userAuthMiddleware, userProfile);

export default router;