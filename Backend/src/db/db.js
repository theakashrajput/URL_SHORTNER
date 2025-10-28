import mongoose from "mongoose";
import dotenvData from "../../config/env.config.js";

const connectToDB = () => {
    mongoose.connect(dotenvData.MONGO_URI)
        .then(() => console.log("✅ Connected to MongoDB successfully"))
        .catch((err) => {
            console.error("❌ Failed to connect to MongoDB:", err.message);
            console.error("⚠️  Application will exit due to database connection failure");
            process.exit(1); // Exit the application if DB connection fails
        });
};

export default connectToDB;