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
  isManagement: {
    type: Boolean,
    required: false,
  },
});

const userModel = model<User & Document>("User", userSchema);

export default userModel;
