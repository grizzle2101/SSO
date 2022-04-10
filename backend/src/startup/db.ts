import mongoose from "mongoose";
import { set } from "mongoose";
import { logger } from "./logger";
import userModel from "../models/user.model";
import { User } from "../interfaces/user.interface";
import bcrypt from "bcryptjs";

const users = userModel;

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

export async function seedDatabase() {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash("admin", salt);

  const adminUser: User = {
    name: "admin",
    email: "admin@admin.com",
    password,
    isManagement: true,
  };

  let result = await users.updateOne(
    {},
    { $setOnInsert: adminUser },
    { upsert: true }
  );

  if (result.upsertedCount)
    logger.info("No Users found, seeding default Admin User.");
}
