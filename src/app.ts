
import express from 'express';
import { Routes } from './interfaces/routes.interface';
import { connect, set } from 'mongoose';
import dotenv from 'dotenv';


class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  
  constructor(routes: Routes[]) {
    dotenv.config();
    this.app = express();
    this.env = process.env.NODE_ENV || 'development';
    this.port = process.env.PORT || 3000;
    
    this.connectToDatabase();
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
    if (this.env !== 'production') {
      set('debug', true);
    }
  
    const db = process.env.DB_URI;

    connect(db)
    .then(() => console.log(`Connected to ${db}...`))
    .catch((error) => console.log('Failed to connect to MongoDB - ' , error));
  }


  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
        console.log('route - ', route)
      this.app.use('/', route.router);
    });
  }
}

export default App;
