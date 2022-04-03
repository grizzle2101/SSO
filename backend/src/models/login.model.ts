import { model, Schema, Document } from "mongoose";
import { Login } from "../interfaces/login.interface";
import { userSchema } from "./user.model";

const loginSchema: Schema = new Schema({
  user: {
    type: userSchema,
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
