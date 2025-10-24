import dotenvData from "../../config/env.config.js";
import { genrateShortURLWithoutUser } from "../dao/url.dao.js";

export const creatShortUrl = async (req, res) => {
    const { orignalUrl } = req.body;
    const url = await genrateShortURLWithoutUser(orignalUrl);
    res.status(200).json({
        url: dotenvData.BASE_URL + '/' + url.shortUrl
    })
};