import mongoose from "mongoose";
import dotenvData from "../../config/env.config.js";

const connectToDB = () => {
    mongoose.connect(dotenvData.MONGO_URI)
        .then(() => console.log("Connect to DB"))
        .catch(() => console.log("Failed to connect DB"))
};

export default connectToDB;