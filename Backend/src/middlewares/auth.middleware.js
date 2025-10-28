import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";
import CustomError from "../utils/customError.js";

// middleware (not wrapped) — use next(err) instead of throw
export const userAuthMiddleware = async (req, res, next) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({
        success: false,
        message: "Unauthorized"
    });

    try {
        const decoded = await verifyToken(token);
        const user = await findUserById(decoded);
        if (!user) return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
        req.user = user;
        next();
    } catch (err) {
        return next(new CustomError("Unauthorized", 401));
    }
};
