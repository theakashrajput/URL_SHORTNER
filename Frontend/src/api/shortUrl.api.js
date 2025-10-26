import axiosInstance from "../utils/axiosInstance.js";

export const createShortUrl = async (originalUrl) => {
    const { data } = await axiosInstance.post("/short-url/", { originalUrl })
    // return data
    console.log(data);
}