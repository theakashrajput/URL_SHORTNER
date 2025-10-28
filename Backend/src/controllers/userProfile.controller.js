import { asyncWrapper } from "../utils/asyncWrapper.js";
import urlModel from "../models/url.model.js";
import CustomError from "../utils/customError.js";
import mongoose from "mongoose";

export const userProfile = asyncWrapper(async (req, res) => {
    const userId = req.params.id;

    // Validate userId is a valid ObjectId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new CustomError("Invalid user ID", 400);
    }

    const urlData = await urlModel.find({ user: userId }, { originalUrl: 1, shortUrl: 1, counts:1, _id: 0 });

    res.status(200).json({
        success: true,
        urls: urlData
    });
});