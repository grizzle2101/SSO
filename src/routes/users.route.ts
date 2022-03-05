import { Router } from "express";

export class UsersRoute {
  public path = "/users";
  public router = Router();

  public mockUser = {
    username: "test",
    password: "password",
    email: "test@gmail.com",
  };

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, async (req, res) => {
      res.send(this.mockUser);
    });

    this.router.post(this.path, async (req, res) => {
      console.log("body - ", req.body);
      res.send(req.body);
    });
  }
}
