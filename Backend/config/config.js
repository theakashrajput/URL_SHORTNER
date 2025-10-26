import dotenvData from "./env.config.js";

export const cookieOptions = {
    httpOnly: true,
    secure: dotenvData.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 1000 * 60 * 60 * 24 * 7
}