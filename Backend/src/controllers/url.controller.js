import { generateShortURLWithoutUser, isURLAlreadyExist } from "../dao/url.dao.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";
import { isURLValid } from "../utils/services.js";

export const createShortUrl = asyncWrapper(async (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl) throw new CustomError("Original URL is required", 400);

    if (!isURLValid(originalUrl)) throw new CustomError("Invalid URL format", 400);

    const existing = await isURLAlreadyExist(originalUrl);

    if (existing) return res.status(200).json({
        sucess: true,
        shortUrl: existing.shortUrl
    });

    const url = await generateShortURLWithoutUser(originalUrl);

    res.status(201).json({
        sucess: true,
        shortUrl: url.shortUrl
    })
});