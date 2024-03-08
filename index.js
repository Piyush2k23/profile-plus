import express from 'express';
import dotenv from "dotenv";
import databaseConnection from "./config/dbConnection.js";

dotenv.config();

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 4000;

databaseConnection();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});