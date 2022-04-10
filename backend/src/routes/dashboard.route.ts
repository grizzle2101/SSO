import { Router } from "express";
import dashboardTotalsModel from "../models/dashboard-totals.model";

export class DashboardRoute {
  public path = "/api/dashboard";
  public router = Router();
  public dashboard = dashboardTotalsModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, async (req, res) => {
      const dashboardData = await this.dashboard.findOne({});
      res.send(dashboardData);
    });
  }
}
