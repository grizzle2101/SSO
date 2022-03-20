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
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
});

const userModel = model<User & Document>("User", userSchema);

export default userModel;
