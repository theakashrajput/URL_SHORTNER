import axios from "../utils/axiosInstance";

export const createShortUrl = async (url) => {
    try{
        const { data } = await axios.post("/api/short-url/", url)
        return data;
    } catch(err){
        return {
            success: false,
            message: err.response?.data?.message || "Failed to create short URL. Please try again."
        };
    }
}
