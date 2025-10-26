import express from "express";
import { createCustomUrl, createShortUrl } from "../controllers/url.controller.js";

const router = express.Router();

router.post("/", createShortUrl);
router.post("/custom-url", createCustomUrl);

export default router;