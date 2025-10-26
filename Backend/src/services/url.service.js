import dotenvData from "../../config/env.config.js";
import { isSlugAlreadyUsed, saveShortUrl } from "../dao/url.dao.js";
import CustomError from "../utils/customError.js";
import { generateNanoId } from "../utils/helper.js";

export const generateShortURLWithoutUser = async (originalUrl) => {
    const shortCode = generateNanoId(8);
    const shortUrl = `${dotenvData.BASE_URL}/${shortCode}`;

    const urlInstance = await saveShortUrl(originalUrl, shortUrl, shortCode);

    return urlInstance;
};

export const generateShortURLWithUser = async (originalUrl, userId, slug = null) => {
    if (slug) {
        const isSlugExist = await isSlugAlreadyUsed(userId, slug);
        if (isSlugExist) throw new CustomError("This custom url already exists", 409);
    }
    const shortCode = slug || generateNanoId(8);
    const shortUrl = `${dotenvData.BASE_URL}/${shortCode}`;

    const urlInstance = await saveShortUrl(originalUrl, shortUrl, shortCode, userId);

    return urlInstance;
}