import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Joi from "joi";
import loginModel from "../models/login.model";
import { User } from "../interfaces/user.interface";

export class LoginRoute {
  public path = "/api/login";
  public router = Router();
  public users = userModel;
  public logins = loginModel;
  private privateKey = process.env.PRIVATE_KEY;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //Login Action
    this.router.post(this.path, async (req, res) => {
      const { error } = this.validateRequest(req.body);
      if (error) return res.status(404).send(error.message);

      const user = await this.users.findOne({
        email: req.body.email,
      });

      await this.checkUserAndPassword(user, req, res);
      await this.updateLogs(user);

      const token = jwt.sign({ user }, this.privateKey);

      res.send({ token });
    });

    //GET Logins
    this.router.get(this.path, async (req, res) => {
      const logins = await this.logins.find();
      res.send(logins);
    });
  }

  private async checkUserAndPassword(user: User, req: Request, res: Response) {
    if (!user) return res.status(404).send("Invalid email");

    const password = await bcrypt.compare(req.body.password, user.password);
    if (!password) return res.status(404).send("Incorrect password");
  }

  private updateLogs(user: User) {
    this.addLogEntry(user);
    this.addToAggregates();
  }
  private async addLogEntry(user: User) {
    const login = await this.logins.create({
      user: { _id: user._id, email: user.email },
      timeStamp: new Date(),
      origin: "Ireland",
    });
  }
  private addToAggregates() {
    console.log("aggregating...");
  }

  private validateRequest(request: any) {
    const schema = Joi.object({
      email: Joi.string().min(5).max(320).required().email().lowercase(),
      password: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(request, { convert: true });
  }
}
