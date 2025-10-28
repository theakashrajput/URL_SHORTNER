import urlModel from "../models/url.model.js";
import CustomError from "../utils/customError.js";
import mongoose from "mongoose";

export const saveShortUrl = async (originalUrl, shortUrl, shortCode, userId) => {
    try {
        const urlInstance = new urlModel({
            originalUrl, shortUrl, shortCode
        });
        if (userId) {
            urlInstance.user = userId
        }
        const newUrlInstance = await urlInstance.save();
        return newUrlInstance
    } catch (err) {
        throw new CustomError(err.message, 500);
    }
};

export const isSlugAlreadyUsed = async (userId, slug) => {
    try {
        // Validate userId is a valid ObjectId
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            throw new CustomError("Invalid user ID", 400);
        }

        const isSlugExist = await urlModel.findOne({ user: userId, shortCode: slug });
        return isSlugExist ? true : false
    } catch (err) {
        throw new CustomError(err.message, err.statusCode || 500);
    }
};