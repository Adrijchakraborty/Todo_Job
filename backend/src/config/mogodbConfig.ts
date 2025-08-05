import mongoose from "mongoose";

export const useMongodbConfig = async () => {
  const mongo_url = process.env.MONGO_URI;

  if (!mongo_url) {
    throw new Error("MONGO_URI is not defined in environment variables.");
  }

  try {
    await mongoose.connect(mongo_url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};
