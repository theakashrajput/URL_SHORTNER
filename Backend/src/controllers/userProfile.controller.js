import { asyncWrapper } from "../utils/asyncWrapper.js";
import urlModel from "../models/url.model.js";

export const userProfile = asyncWrapper(async (req, res) => {
    const userId = req.params.id;

    const urlData = await urlModel.find({ user: userId }, { originalUrl: 1, shortUrl: 1, counts:1, _id: 0 });

    res.status(200).json({
        success: true,
        urls: urlData  
    });
});