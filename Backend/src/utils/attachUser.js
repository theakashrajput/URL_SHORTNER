import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "./helper.js";

export const attachUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return next(); 

    try {
        const decoded = await verifyToken(token);
        const user = await findUserById(decoded);
        req.user = user;
        return next();
    } catch (err) {
        return next();
    }
}