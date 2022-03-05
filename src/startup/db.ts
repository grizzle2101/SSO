//import dotenv from 'dotenv';
import mongoose from "mongoose";

export function connectToMongoDB() {
  //dotenv.config();
  require('dotenv').config()
  const db = process.env.DB_URI;
  mongoose.connect(db).then(() => console.log(`Connected to ${db}...`)).catch((error) => console.log('Failed to connect to MongoDB - ' , error));
};
