import { asyncWrapper } from "../utils/asyncWrapper.js";
import urlModel from "../models/url.model.js";

export const userProfile = asyncWrapper(async (req, res) => {
    const userId = req.params.id;

    const urlData = await urlModel.find({ user: userId });

    res.status(200).json({
        success: true,
        user: {
            username: req.user.userName,
            email: req.user.email
        },
        urls: urlData  
    });
});