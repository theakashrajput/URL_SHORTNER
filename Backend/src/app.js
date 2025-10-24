import express from "express";
import urlRoutes from "./routes/url.routes.js"
import urlModel from "./models/url.model.js";
import cors from "cors";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js"
import CustomError from "./utils/customError.js";
import { asyncWrapper } from "./utils/asyncWrapper.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

app.use("/short-url", urlRoutes);

app.get(`/:shortCode`, asyncWrapper(async (req, res) => {
    const { shortCode } = req.params;
    const url = await urlModel.findOneAndUpdate({ shortCode }, { $inc: { counts: 1 } }, { new: true });
    if (!url) throw new CustomError("Short URL not found", 404);
    res.redirect(url.originalUrl);
}))

app.use(errorHandlerMiddleware);
export default app;