import { model, Schema, Document } from "mongoose";
import { User } from "../interfaces/user.interface";

export const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = model<User & Document>("users", userSchema);

export default userModel;
