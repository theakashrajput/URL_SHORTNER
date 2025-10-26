import { createUser, findUser, isUserExist } from "../dao/user.dao.js";
import CustomError from "../utils/customError.js";
import { comparePassword, jwtTokenSign } from "../utils/helper.js";

export const registerUserService = async (userName, email, password) => {
    const existingUser = await isUserExist(email);
    
    if (existingUser) throw new CustomError("Email address already used", 409);

    const newUser = await createUser(userName, email, password);

    const token = jwtTokenSign({ id: newUser._id });
    return { token, newUser }
};

export const loginUserService = async (email, password) => {
    const user = await findUser(email);
    
    if (!user) throw new CustomError("Invalid user credentials", 401);

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) throw new CustomError("Invalid user credentials", 401);

    const token = jwtTokenSign({ id: user._id });
    return { token, user };
};