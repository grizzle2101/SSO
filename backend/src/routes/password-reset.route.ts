import bcrypt from "bcryptjs";
import Joi from "joi";
import { Router } from "express";
import userModel from "../models/user.model";
import { EmailService } from "../services/EmailService";
import jwt from "jsonwebtoken";

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
    //Task 1 - Create Email with Link & Token.
    this.router.post(this.path, async (req, res) => {
      const requestValidity = this.validateRequest(req.body);

      if (requestValidity.error)
        return res.status(404).send(requestValidity.error.message);

      let user = await this.users.findOne({ email: req.body.email });

      if (!user) res.status(400).send("User does not exist.");

      const token = jwt.sign({ user }, this.privateKey);
      let result = await this.service.sendPasswordResetEmail(user, token);

      res.send(result);
    });

    //Task 2 - Create UI Component to Allow the Password Reset.
    //Task 3 - Update the User account here as normal

    //note - look at securing these endpoints, only users with valid token should be allowed complete this.
    this.router.post(this.completePasswordReset, async (req, res) => {
      res.send("");
    });
  }

  private async saltPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  //todo - cleanup, to use existing user & token models.
  private validateRequest(request: any) {
    const schema = Joi.object({
      _id: Joi.string().min(5).max(255).required(),
      name: Joi.string().min(5).max(255).required(),
      email: Joi.string().min(5).max(320).required().email().lowercase(),
      isManagement: Joi.bool().optional(),
      password: Joi.string().min(5).max(255),
    });
    return schema.validate(request);
  }
}
