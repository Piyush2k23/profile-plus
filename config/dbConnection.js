import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
    throw new Error("Database not connected");
    process.exit(1);
  }
};

export default databaseConnection;