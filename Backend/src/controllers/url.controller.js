import { isSlugAlreadyUsed, isURLAlreadyExist } from "../dao/url.dao.js";
import urlModel from "../models/url.model.js";
import { generateCustomUrl, generateShortURLWithoutUser, generateShortURLWithUser } from "../services/url.service.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";
import { isURLValid } from "../utils/helper.js";


export const createShortUrl = asyncWrapper(async (req, res) => {
    const data = req.body;
    let url;

    if (!data.originalUrl) throw new CustomError("Original URL is required", 400);

    if (!isURLValid(data.originalUrl)) throw new CustomError("Invalid URL format", 400);

    if (req.user) {
        const existing = await isURLAlreadyExist(data.originalUrl);
        if (existing) return res.status(409).json({
            success: true,
            message: "URL already shortened",
            shortUrl: existing.shortUrl
        });
        url = await generateShortURLWithUser(data.originalUrl, req.user._id);
    } else {
        url = await generateShortURLWithoutUser(data.originalUrl);
    }

    res.status(201).json({
        success: true,
        shortUrl: url.shortUrl
    })
});

export const createCustomUrl = asyncWrapper(async (req, res) => {

    const { originalUrl, slug } = req.body;
    
    if (!originalUrl || !slug) throw new CustomError("All feilds are required", 400);
    
    if (!isURLValid(originalUrl)) throw new CustomError("Invalid URL format", 400);
    
    const existing = await isSlugAlreadyUsed(req.user._id, slug);
    if (existing) return res.status(409).json({
        success: false,
        message: "Slug already used",
        shortUrl: existing.shortUrl
    });
    
    const url = await generateCustomUrl(originalUrl, slug, req.user._id);

    res.status(201).json({
        success: true,
        shortUrl: url.shortUrl
    });
})

export const redirectShortUrl = asyncWrapper(async (req, res) => {
    const { shortCode } = req.params;
    const url = await urlModel.findOneAndUpdate({ shortCode }, { $inc: { counts: 1 } }, { new: true });
    if (!url) throw new CustomError("Short URL not found", 404);
    res.redirect(url.originalUrl);
});