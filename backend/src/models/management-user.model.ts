import { model, Schema, Document } from "mongoose";
import { User } from "../interfaces/user.interface";

export const managementUserSchema: Schema = new Schema({
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

const managementUserModel = model<User & Document>(
  "management-users",
  managementUserSchema
);

export default managementUserModel;
