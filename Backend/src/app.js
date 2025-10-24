import express from "express";
import urlRoutes from "./routes/url.routes.js"
import urlModel from "./models/url.model.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

app.use("/short-url", urlRoutes);

app.get(`/:shortUrl`, async (req, res) => {
    const { shortUrl } = req.params;
    const url = await urlModel.findOneAndUpdate({ shortUrl }, {$inc: {counts: 1}}, {new: true});
    res.redirect(url.orignalUrl);
})

export default app;