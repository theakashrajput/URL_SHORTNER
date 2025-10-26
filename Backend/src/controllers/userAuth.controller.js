import { asyncWrapper } from "../utils/asyncWrapper.js"
import CustomError from "../utils/customError.js";
import { loginUserService, registerUserService } from "../services/auth.service.js";
import { cookieOptions } from "../../config/config.js";

export const userRegister = asyncWrapper(async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) throw new CustomError("All fields are required", 400);

    const {token, newUser} = await registerUserService(userName, email, password);

    res.cookie('token', token, cookieOptions);

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: { id: newUser._id, name: newUser.userName, email: newUser.email },
    });
});

export const userLogin = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) throw new CustomError("All fields are required", 400);

    const { token, user } = await loginUserService(email, password);

    res.cookie('token', token, cookieOptions);

    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user: { id: user._id, name: user.userName, email: user.email },
    });
})