import express from 'express';
import dotenv from "dotenv";
import user from "./routes/userRoute.js";
import post from "./routes/postRoute.js";
import follow from "./routes/followRoute.js";
import databaseConnection from "./config/dbConnection.js";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", user);
app.use("/api/v1", post);
app.use("/api/v1", follow);



const PORT = process.env.PORT || 4000;

databaseConnection();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});