import { Router } from "express";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Joi from "joi";

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

      const requestValidity = this.validateRequest(req.body);
      if (requestValidity.error) return res.status(404).send(requestValidity.error.message);
        
      const user = await this.users.findOne({
        email: req.body.email.toLowerCase(),
      });

      if (!user) return res.status(404).send("Invalid email");

      const password = await bcrypt.compare(req.body.password, user.password);
      if (!password) return res.status(404).send("Incorrect password");

      const token = jwt.sign({ user }, this.privateKey);

      res.send({ token });
    });
  }
  private validateRequest (request: any) {
    const schema = Joi.object({
      email: Joi.string().min(5).max(320).required().email(),
      password: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(request);
  }
}
