import { model, Schema, Document } from "mongoose";
import { LoginTotals } from "../interfaces/login-totals.interface";

const loginTotalsSchema: Schema = new Schema({
  totalUsers: {
    type: Number,
  },
  totalTokensIssued: {
    type: Number,
  },
});

const loginTotalsModel = model<LoginTotals & Document>(
  "LoginTotals",
  loginTotalsSchema
);

export default loginTotalsModel;
