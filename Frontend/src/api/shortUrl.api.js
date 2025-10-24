import axiosInstance from "../utils/axiosInstance.js";

export const createShortUrl = async (orignalUrl) => {
    const { data } = await axiosInstance.post("/short-url/", { orignalUrl })
    return data.url
}