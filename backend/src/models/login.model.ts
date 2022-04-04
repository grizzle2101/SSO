import { model, Schema, Document } from "mongoose";
import { Login } from "../interfaces/login.interface";

const loginSchema: Schema = new Schema({
  user: {
    _id: { type: String, required: true },
    email: { type: String, required: true },
  },
  timeStamp: {
    type: Date,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
});

const loginModel = model<Login & Document>("Login", loginSchema);

export default loginModel;
