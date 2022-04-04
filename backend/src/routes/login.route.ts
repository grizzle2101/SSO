import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Joi from "joi";
import userModel from "../models/user.model";
import loginModel from "../models/login.model";
import dashboardTotalsModel from "../models/dashboard-totals.model";
import { User } from "../interfaces/user.interface";

export class LoginRoute {
  public path = "/api/login";
  public router = Router();
  public users = userModel;
  public logins = loginModel;
  public dashboardTotals = dashboardTotalsModel;
  private privateKey = process.env.PRIVATE_KEY;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, async (req, res) => {
      const { error } = this.validateRequest(req.body);
      if (error) return res.status(404).send(error.message);

      const user = await this.users.findOne({
        email: req.body.email,
      });

      const userError = await this.checkUserAndPassword(user, req, res);
      if (userError) {
        this.logFailure();
        return res.status(404).send(userError);
      } else {
        await this.updateLogs(user);
        const token = jwt.sign({ user }, this.privateKey);
        res.send({ token });
      }
    });

    this.router.get(this.path, async (req, res) => {
      const logins = await this.logins.find();
      res.send(logins);
    });
  }

  private async checkUserAndPassword(user: User, req: Request, res: Response) {
    if (!user) return "Invalid email";

    const password = await bcrypt.compare(req.body.password, user.password);
    if (!password) return "Incorrect password";
  }

  private updateLogs(user: User) {
    this.addLogEntry(user);
    this.updateDashboard(1);
  }

  private logFailure() {
    this.updateDashboard(0, 0, 1);
  }
  private async addLogEntry(user: User) {
    await this.logins.create({
      user: { _id: user._id, email: user.email },
      timeStamp: new Date(),
      origin: "Ireland",
    });
  }
  private async updateDashboard(
    totalTokensIssued: number = 0,
    totalUsers: number = 0,
    totalFailures: number = 0
  ) {
    await this.dashboardTotals.updateOne(
      {},
      {
        $inc: {
          totalTokensIssued,
          totalUsers,
          totalFailures,
        },
      },
      { upsert: true }
    );
  }

  private validateRequest(request: any) {
    const schema = Joi.object({
      email: Joi.string().min(5).max(320).required().email().lowercase(),
      password: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(request, { convert: true });
  }
}
