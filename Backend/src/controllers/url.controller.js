import urlModel from "../models/url.model.js";
import { generateShortURLWithoutUser, generateShortURLWithUser } from "../services/url.service.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";
import { isURLValid } from "../utils/helper.js";


export const createShortUrl = asyncWrapper(async (req, res) => {
    const data = req.body;
    let url;

    if (!data.originalUrl) throw new CustomError("Original URL is required", 400);

    if (!isURLValid(data.originalUrl)) throw new CustomError("Invalid URL format", 400);

    if (req.user) {
        url = await generateShortURLWithUser(data.originalUrl, req.user._id, data.slug);
    } else {
        url = await generateShortURLWithoutUser(data.originalUrl);
    }

    res.status(201).json({
        success: true,
        shortUrl: url.shortUrl
    })
});

export const redirectShortUrl = asyncWrapper(async (req, res) => {
    const { shortCode } = req.params;
    const url = await urlModel.findOneAndUpdate({ shortCode }, { $inc: { counts: 1 } }, { new: true });
    if (!url) throw new CustomError("Short URL not found", 404);
    res.redirect(url.originalUrl);
});