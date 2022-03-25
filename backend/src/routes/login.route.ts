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
        email: req.body.email.toLowerCase(),
        password: req.body.password,
      });

      if (!user) return res.status(404).send("Could not Find user.");

      const token = jwt.sign({ user }, this.privateKey);

      res.send({ token });
    });
  }
}
