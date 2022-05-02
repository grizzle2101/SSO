import bcrypt from "bcryptjs";
import Joi from "joi";
import { Router } from "express";
import userModel from "../models/user.model";
import { EmailService } from "../services/EmailService";
import jwt from "jsonwebtoken";
import { User } from "../interfaces/user.interface";

export class PasswordResetRoute {
  public path = "/api/password-reset";
  public completePasswordReset = "/api/password-reset/complete-change";
  public router = Router();
  public users = userModel;
  private service = new EmailService();
  private privateKey = process.env.PRIVATE_KEY;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, async (req, res) => {
      console.log("BODY - ", req.body);
      const requestValidity = this.validateRequest(req.body);

      if (requestValidity.error)
        return res.status(404).send(requestValidity.error.message);

      let user = await this.users.findById(req.body._id);

      if (!user) res.status(400).send("User does not exist.");

      const token = jwt.sign({ user }, this.privateKey);
      let result = await this.service.sendPasswordResetEmail(user, token);

      res.send(result);
    });

    //note - look at securing these endpoints, only users with valid token should be allowed complete this.
    this.router.post(this.completePasswordReset, async (req, res) => {
      console.log("req.body ", req.body);

      const requestValidity = this.validateRequest(req.body);

      if (requestValidity.error)
        return res.status(404).send(requestValidity.error.message);

      console.log("requestValidity ", requestValidity);

      const userId: string = req.body._id;
      const saltedPassword = await this.saltPassword(req.body.password);

      const user: User[] = await this.users.findByIdAndUpdate(
        userId,
        {
          password: saltedPassword,
        },
        { new: true }
      );

      res.send(user);
    });
  }

  private async saltPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  private validateRequest(request: any) {
    const schema = Joi.object({
      _id: Joi.string().min(5).max(255).required(),
      password: Joi.string().min(5).max(255),
    });
    return schema.validate(request);
  }
}
