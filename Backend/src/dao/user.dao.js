import userModel from "../models/user.model.js";
import CustomError from "../utils/customError.js";
import { hashPassword } from "../utils/helper.js";
import mongoose from "mongoose";

export const isUserExist = async (email) => {
    try {
        const userExist = await userModel.exists({ email });

        return userExist;
    } catch (err) {
        throw new CustomError("Database lookup failed", 500);
    }
}

export const createUser = async (userName, email, password) => {
    try {
        const hashedPassword = await hashPassword(password, 10);
        const userInstance = await userModel.create({ userName, email, password: hashedPassword });
        return userInstance;
    } catch (err) {
        if (err.code === 11000) {
            throw new CustomError("Email already exists", 409);
        }
        throw new CustomError(err.message || "Database Error", 500);
    }
};

export const findUser = async (email) => {
    try {
        const user = await userModel.findOne({ email: email });
        return user;
    } catch (err) {
        throw new CustomError(err.message || "Database Error", 500);
    }
}

export const findUserById = async (id) => {
    try {
        // Validate id is a valid ObjectId
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            throw new CustomError("Invalid user ID", 400);
        }

        const user = await userModel.findById(id);
        return user;
    } catch (err) {
        throw new CustomError(err.message || "Database Error", err.statusCode || 500)
    }
}