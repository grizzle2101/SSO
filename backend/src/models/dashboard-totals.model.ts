import { model, Schema, Document } from "mongoose";
import { DashboardTotals } from "../interfaces/dashboard-totals.interface";

const dashboardTotalsSchema: Schema = new Schema({
  totalUsers: {
    type: Number,
  },
  totalTokensIssued: {
    type: Number,
  },
  totalFailures: {
    type: Number,
  },
});

const dashboardTotalsModel = model<DashboardTotals & Document>(
  "dashboard-totals",
  dashboardTotalsSchema
);

export default dashboardTotalsModel;
