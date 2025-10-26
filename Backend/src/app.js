import express from "express";
import urlRoutes from "./routes/url.routes.js"
import cors from "cors";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js"
import { redirectShortUrl } from "./controllers/url.controller.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser";
import { attachUser } from "./utils/attachUser.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(attachUser);

app.use("/api/short-url", urlRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.get(`/:shortCode`, redirectShortUrl)

app.use(errorHandlerMiddleware);

export default app;