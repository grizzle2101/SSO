import { Router } from "express";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export class LoginRoute {
  public path = "/api/login";
  public router = Router();
  public users = userModel;
  private privateKey = process.env.PRIVATE_KEY;

  //I don't know if this can or should be managed from here?
  private isManagementLogin = false; 

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, async (req, res) => {
      const user = await this.users.findOne({
        email: req.body.email,
      });

      if (!user) return res.status(404).send("Invalid email");

      const password = await bcrypt.compare(req.body.password, user.password);
      if (!password) return res.status(404).send("Incorrect password");
      if (this.isManagementLogin && !user.isManagement) return res.status(404).send("Insufficient permission to access management app")

      const token = jwt.sign({ user }, this.privateKey);

      res.send({ token });
    });
  }
}
