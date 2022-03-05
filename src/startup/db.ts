import dotenv from "dotenv";
import mongoose from "mongoose";
import { set } from "mongoose";

export function connectToMongoDB() {
  dotenv.config();

  const db = process.env.DB_URI;

  let env = process.env.NODE_ENV || "development";

  if (env !== "production") {
    set("debug", true);
  }

  mongoose
    .connect(db)
    .then(() => console.log(`Connected to ${db}...`))
    .catch((error) => console.log("Failed to connect to MongoDB - ", error));
}
