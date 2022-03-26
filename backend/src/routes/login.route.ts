import { Router } from "express";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

      const password = await bcrypt.compare(req.body.password, user.password);

      if (!user || !password)
        return res.status(404).send("Invalid email or password");

      const token = jwt.sign({ user }, this.privateKey);

      res.send({ token });
    });
  }
}
