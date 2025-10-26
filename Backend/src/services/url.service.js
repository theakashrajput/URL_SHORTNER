import dotenvData from "../../config/env.config.js";
import { saveShortUrl } from "../dao/url.dao.js";
import { generateNanoId } from "../utils/helper.js";

export const generateShortURLWithoutUser = async (originalUrl) => {
    const shortCode = generateNanoId(8);
    const shortUrl = `${dotenvData.BASE_URL}/${shortCode}`;

    const urlInstance = await saveShortUrl(originalUrl, shortUrl, shortCode);

    return urlInstance;
};

export const generateShortURLWithUser = async (originalUrl, userId)=>{
    const shortCode = generateNanoId(8);
    const shortUrl = `${dotenvData.BASE_URL}/${shortCode}`;

    const urlInstance = await saveShortUrl(originalUrl, shortUrl, shortCode, userId);

    return urlInstance; 
}

export const generateCustomUrl = async (originalUrl, slug, userId)=>{
    const shortUrl = `${dotenvData.BASE_URL}/${slug}`;
    const urlInstance = await saveShortUrl(originalUrl, shortUrl,slug, userId);
    return urlInstance
}