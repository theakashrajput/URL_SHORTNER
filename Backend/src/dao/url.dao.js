import urlModel from "../models/url.model.js";
import { genrateNanoId } from "../utils/services.js";

export const genrateShortURLWithoutUser = async (orignalUrl)=>{
    const shortUrl = genrateNanoId();
    const urlInstance = await urlModel.create({
        orignalUrl, shortUrl
    });
    return urlInstance;
};