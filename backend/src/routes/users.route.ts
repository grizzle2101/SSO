import { Router } from "express";
import { User } from "../interfaces/user.interface";
import userModel from "../models/user.model";

export class UsersRoute {
  public path = "/api/users";
  public router = Router();
  public users = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, async (req, res) => {
      const result = await this.users.create({
        name: req.body.name,
        email: req.body.email.toLowerCase(),
      });
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
      const userId: string = req.params.id;

      const user: User[] = await this.users.findByIdAndUpdate(
        userId,
        {
          name: req.body.name,
          email: req.body.email.toLowerCase(),
          password: req.body.password,
        },
        { new: true }
      );

      res.send(user);
    });

    this.router.delete(`${this.path}/:id`, async (req, res) => {
      const userId: string = req.params.id;
      const user: User[] = await this.users.findByIdAndDelete(userId);
      res.send(user);
    });
  }
}
