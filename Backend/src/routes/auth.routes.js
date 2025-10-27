import express from "express";
import { userRegister, userLogin, isUserLogedIn } from "../controllers/userAuth.controller.js";
import { userAuthMiddleware } from "../middlewares/auth.middleware.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/register", [
    body("userName").trim().notEmpty().withMessage("Username is required"),
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("password").trim().isLength({ min: 6 }).withMessage("Min 6 chars")
], userRegister);
router.post("/login", userLogin);
router.get("/check", userAuthMiddleware, isUserLogedIn);

export default router;