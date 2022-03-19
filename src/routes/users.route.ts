import { Router } from "express";
import { User } from "../interfaces/user.interface";
import userModel from "../models/user.model";

export class UsersRoute {
  public path = "/users";
  public router = Router();
  public users = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, async (req, res) => {
      const users: User[] = await this.users.find();
      res.send(users);
    });

    this.router.post(this.path, async (req, res) => {
      const result = await this.users.create({ name: req.body.name });
      res.send(result);
    });
  }
}
