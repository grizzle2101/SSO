import { model, Schema, Document } from "mongoose";
import { ActiveReset } from "../interfaces/active-reset";

const activeReset: Schema = new Schema({
  userId: {
    type: String,
    unique: true,
  },
  dateIssued: {
    type: Date,
  },
});

const activeResetModel = model<ActiveReset & Document>(
  "active-resets",
  activeReset
);

export default activeResetModel;
