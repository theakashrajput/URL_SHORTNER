import axios from "../utils/axiosInstance.js";checkUserLoggedIn

export const loginUserApi = async (user) => {
    try {
        const { data } = await axios.post("/api/auth/login", user, { silent: true });
        return data;
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || "Login failed. Please try again."
        };
    }
};

export const logoutUserApi = async () => {
    try {
        const { data } = await axios.post("/api/auth/logout", { silent: true });
        return data;
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || "Logout failed. Please try again."
        };
    }
};

export const registerUserApi = async (user) => {
    try {
        const { data } = await axios.post("/api/auth/register", user, { silent: true });
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

export const fetchUserProfile = async (userId) => {
    try {
        const { data } = await axios.get(`/api/user/${userId}`);
        return data;
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || "Fetching user profile failed. Please try again.",
            urls: []
        };
    }
}
