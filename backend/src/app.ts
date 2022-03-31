import express from "express";
import { Routes } from "./interfaces/routes.interface";
import { connectToMongoDB, seedDatabase } from "./startup/db";
import { logger } from "./startup/logger";
import cors from "cors";

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public logger = logger;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = process.env.NODE_ENV || "development";
    this.port = process.env.PORT || 3000;

    this.connectToDatabase();
    this.seedDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    connectToMongoDB();
  }

  private seedDatabase() {
    seedDatabase();
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
