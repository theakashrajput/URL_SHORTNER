import express from "express";
import { creatShortUrl } from "../controllers/url.controller.js";

const router = express.Router();

router.post("/", creatShortUrl);

export default router;