import axios from "../utils/axiosInstance";

export const loginUserApi = async (user) => {
    const res = await axios.post("/api/auth/login", user, {
        withCredentials: true,
    });
    console.log(res);
};

export const registerUserApi = async (user) => {
    const res = await axios.post("/api/auth/register", user, {
        withCredentials: true,
    });
    console.log(res);
};
