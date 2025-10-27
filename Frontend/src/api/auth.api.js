import axios from "../utils/axiosInstance";

export const loginUserApi = async (user) => {
    try {
        const { data } = await axios.post("/api/auth/login", user, {
            withCredentials: true,
        });
        return data;
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || "Login failed. Please try again."
        };
    }
};

export const registerUserApi = async (user) => {
    try {
        const { data } = await axios.post("/api/auth/register", user, {
            withCredentials: true,
        });
        return data;
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || "Registration failed. Please try again."
        };
    }
};


export const checkUserLoggedIn = async () => {
    try {
        const { data } = await axios.get("/api/auth/check");
        return data;
    } catch (err) {
        throw err;
    }
}