import { nanoid } from 'nanoid'
import dotenvData from '../../config/env.config.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import CustomError from './customError.js'; // ...existing code...

export const generateNanoId = (length) => {
    return nanoid(length);
};

export const isURLValid = (url) => {
    try {
        return new URL(url);
    } catch (err) {
        return false
    }
};

export const jwtTokenSign = (payload) => {
    const token = jwt.sign(payload, dotenvData.JWT_SECRET, { expiresIn: '7d' });
    return token
};

export const verifyToken = (token)=>{
    const decoded = jwt.verify(token, dotenvData.JWT_SECRET)
    return decoded.id;
}

export const hashPassword = async (password, saltRounds = 10) => {
    if (!password) throw new CustomError('Password is required for hashing', 400);
    try {
        const rounds = Number(saltRounds) || 10;
        const hashedPassword = await bcrypt.hash(password, rounds);
        return hashedPassword;
    } catch (err) {
        throw new CustomError('Failed to hash password', 500);
    }
};

export const comparePassword = async (password, hashedPassword) => {
    if (!password || !hashedPassword) throw new CustomError('Invalid password or hash provided', 400);
    try {
        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
        return isPasswordCorrect;
    } catch (err) {
        throw new CustomError('Failed to compare password', 500);
    }
};