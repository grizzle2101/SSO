import { Router } from "express";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";

export class LoginRoute {
  public path = "/api/login";
  public router = Router();
  public users = userModel;
  private privateKey = process.env.PRIVATE_KEY;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, async (req, res) => {
      const user = await this.users.findOne({
        email: req.body.email,
      });

      if (!user) return res.status(400).send("Failed to Authenticate");

      const token = jwt.sign({ user }, this.privateKey);

      res.status(200).send(token);
    });
  }
}
