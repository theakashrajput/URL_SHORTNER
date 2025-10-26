import urlModel from "../models/url.model.js";
import CustomError from "../utils/customError.js";

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
}

export const isURLAlreadyExist = async (originalUrl) => {
    try {
        return await urlModel.findOne({ originalUrl });
    } catch (err) {
        throw new CustomError(err.message, 500);
    }
}

export const isSlugAlreadyUsed = async (userId, slug) => {
    try {
        const isSlugExist = await urlModel.findOne({ user: userId, shortCode: slug });
        return isSlugExist ? true : false
    } catch (err) {
        throw new CustomError(err.message, 500);
    }
};