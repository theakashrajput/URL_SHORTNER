import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    shortCode: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    counts: {
        type: Number,
        default: 0
    }
});

const urlModel = mongoose.model("url", urlSchema);

export default urlModel;