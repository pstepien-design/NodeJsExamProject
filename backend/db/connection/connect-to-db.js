import mongoose from "mongoose";
import { config } from "dotenv";

config();

export const connectToDB = () => {
  const uri = process.env.DB_URI;

  return mongoose
    .connect(uri, {})
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error(`Error connecting to MongoDB: ${error.message}`);
      throw error;
    });
};
