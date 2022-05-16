import bcrypt from "bcryptjs";
import Joi from "joi";
import { Router } from "express";
import userModel from "../models/user.model";
import { EmailService } from "../services/EmailService";
import jwt from "jsonwebtoken";
import { User } from "../interfaces/user.interface";
import activeResetModel from "../models/active-reset.model";

export class PasswordResetRoute {
  public path = "/api/password-reset";
  public completePasswordReset = "/api/password-reset/complete-change";
  public router = Router();
  public users = userModel;
  public activeLogins = activeResetModel;
  private service = new EmailService();
  private privateKey = process.env.PRIVATE_KEY;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, async (req, res) => {
      const requestValidity = this.validateRequest(req.body);

      if (requestValidity.error)
        return res.status(404).send(requestValidity.error.message);

      let user = await this.users.findById(req.body._id);

      if (!user) res.status(400).send("User does not exist.");

      let currentDate = new Date();

      await this.activeLogins.create({
        userId: user._id,
        dateIssued: currentDate,
      });

      const token = jwt.sign({ user, issued: currentDate }, this.privateKey);
      let result = await this.service.sendPasswordResetEmail(user, token);

      res.send(result);
    });

    this.router.post(this.completePasswordReset, async (req, res) => {
      const requestValidity = this.validateRequest(req.body);

      if (requestValidity.error)
        return res.status(404).send(requestValidity.error.message);

      const userId: string = req.body._id;

      //todo - roll into fawn transaction
      //verify active password reset
      let login = await this.activeLogins.findOne({ userId });
      if (!login) return res.status(404).send("Pasword reset is expired.");
      else login.delete();

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
