import app from './src/app.js';
import connectToDB from './src/db/db.js';
import dotenvData from './config/env.config.js';

connectToDB();

app.listen(dotenvData.PORT, () => console.log(`Server is running on Port ${dotenvData.PORT}`));