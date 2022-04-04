import bcrypt from "bcryptjs";
import Joi from "joi";
import { Router } from "express";
import { User } from "../interfaces/user.interface";
import userModel from "../models/user.model";
import dashboardTotalsModel from "../models/dashboard-totals.model";

export class UsersRoute {
  public path = "/api/users";
  public router = Router();
  public users = userModel;
  public dashboardTotals = dashboardTotalsModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, async (req, res) => {
      const requestValidity = this.validateRequest(true, req.body);
      if (requestValidity.error)
        return res.status(404).send(requestValidity.error.message);

      let user = await this.users.findOne({ email: req.body.email });

      if (user) return res.status(400).send("User already registered.");

      const saltedPassword = await this.saltPassword(req.body.password);

      const result = await this.users.create({
        name: req.body.name,
        email: requestValidity.value.email,
        password: saltedPassword,
        isManagement: req.body.isManagement,
      });

      await this.updateUsersCount(1);
      res.send(result);
    });

    this.router.get(`${this.path}/:id`, async (req, res) => {
      const userId: string = req.params.id;
      const user: User[] = await this.users.findById(userId);
      res.send(user);
    });

    this.router.get(this.path, async (req, res) => {
      const users: User[] = await this.users.find();
      res.send(users);
    });

    this.router.put(`${this.path}/:id`, async (req, res) => {
      const requestValidity = this.validateRequest(false, req.body);
      if (requestValidity.error)
        return res.status(404).send(requestValidity.error.message);

      const userId: string = req.params.id;
      const user: User[] = await this.users.findByIdAndUpdate(
        userId,
        {
          name: req.body.name,
          email: requestValidity.value.email,
          isManagement: req.body.isManagement,
        },
        { new: true }
      );

      res.send(user);
    });

    this.router.delete(`${this.path}/:id`, async (req, res) => {
      const userId: string = req.params.id;
      const user: User[] = await this.users.findByIdAndDelete(userId);
      this.updateUsersCount(-1);
      res.send(user);
    });
  }

  private async updateUsersCount(value: number) {
    await this.dashboardTotals.updateOne({}, { $inc: { totalUsers: value } });
  }

  private async saltPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  private validateRequest(create: boolean, request: any) {
    const schema = Joi.object({
      name: Joi.string().min(5).max(255).required(),
      email: Joi.string().min(5).max(320).required().email().lowercase(),
      isManagement: Joi.bool().optional(),
      password: create ? Joi.string().min(5).max(255) : Joi.forbidden(),
    });
    return schema.validate(request, { convert: true });
  }
}
