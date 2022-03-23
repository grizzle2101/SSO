import express from "express";
import { Routes } from "./interfaces/routes.interface";
import dotenv from "dotenv";
import { connectToMongoDB } from "./startup/db";
import cors from "cors";

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    dotenv.config();
    this.app = express();
    this.env = process.env.NODE_ENV || "development";
    this.port = process.env.PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    connectToMongoDB();
  }

  private initializeMiddlewares() {
    // enabling CORS for local development ONLY.
    if (this.env !== "production") this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }
}

export default App;
