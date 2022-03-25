import mongoose from "mongoose";
import { set } from "mongoose";
import { logger } from "./logger";

export function connectToMongoDB() {
  const db = process.env.DB_URI;
  const env = process.env.NODE_ENV || "development";

  if (env !== "production") {
    set("debug", true);
  }

  mongoose
    .connect(db)
    .then(() => logger.info(`Connected to ${db}...`))
    .catch((error) => logger.info("Failed to connect to MongoDB - ", error));
}
