import { config } from "dotenv";
config();

const dotenvData = {
    PORT : process.env.PORT, 
    MONGO_URI : process.env.MONGO_URI, 
    BASE_URL : process.env.BASE_URL
};

export default dotenvData;