import { Router } from "express";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Joi from "joi";
import loginModel from "../models/login.model";

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
    //Perform Login Action
    this.router.post(this.path, async (req, res) => {
      const requestValidity = this.validateRequest(req.body);

      if (requestValidity.error)
        return res.status(404).send(requestValidity.error.message);

      const user = await this.users.findOne({
        email: requestValidity.value.email,
      });

      if (!user) return res.status(404).send("Invalid email");

      const password = await bcrypt.compare(req.body.password, user.password);
      if (!password) return res.status(404).send("Incorrect password");

      const token = jwt.sign({ user }, this.privateKey);

      const login = await this.logins.create({
        user: user,
        timeStamp: new Date(),
        origin: "Ireland",
      });

      res.send({ login, token });
    });

    //GET Login Resources
    this.router.get(this.path, async (req, res) => {
      const logins = await this.logins.find();
      res.send(logins);
    });
  }
  private validateRequest(request: any) {
    const schema = Joi.object({
      email: Joi.string().min(5).max(320).required().email().lowercase(),
      password: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(request, { convert: true });
  }
}
