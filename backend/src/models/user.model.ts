import { model, Schema, Document } from "mongoose";
import { User } from "../interfaces/user.interface";

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: false,
    unique: false,
  },
  password: {
    type: String,
    required: false,
  },
  isManagement: {
    type: Boolean,
    required: false,
  },
});

const userModel = model<User & Document>("User", userSchema);

export default userModel;
