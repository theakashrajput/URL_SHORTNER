import dotenvData from "../../config/env.config.js";
import urlModel from "../models/url.model.js";
import { generateNanoId } from "../utils/services.js";

export const generateShortURLWithoutUser = async (originalUrl) => {
    const shortCode = generateNanoId();
    const shortUrl = `${dotenvData.BASE_URL}/${shortCode}`;

    const urlInstance = await urlModel.create({
        originalUrl, shortUrl, shortCode
    });
    return urlInstance;
};

export const isURLAlreadyExist = async (originalUrl) => {
    const exist = await urlModel.findOne({ originalUrl });
    return exist;
}