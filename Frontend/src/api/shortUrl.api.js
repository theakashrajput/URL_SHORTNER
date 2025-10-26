import axiosInstance from "../utils/axiosInstance.js";

export const createShortUrl = async (url) => {
    const { data } = await axiosInstance.post("/api/short-url/", url)
    return data.shortUrl;
}