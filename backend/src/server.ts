import App from "./app";
import { UsersRoute } from "./routes/users.route";
import { LoginRoute } from "./routes/login.route";
import { DashboardRoute } from "./routes/dashboard.route";
import dotenv from "dotenv";

dotenv.config();
const app = new App([new UsersRoute(), new LoginRoute(), new DashboardRoute()]);
app.listen();
