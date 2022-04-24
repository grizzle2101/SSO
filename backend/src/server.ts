import App from "./app";
import { UsersRoute } from "./routes/users.route";
import { LoginRoute } from "./routes/login.route";
import { DashboardRoute } from "./routes/dashboard.route";
import dotenv from "dotenv";
import { PasswordResetRoute } from "./routes/password-reset.route";

dotenv.config();
const app = new App([
  new UsersRoute(),
  new LoginRoute(),
  new DashboardRoute(),
  new PasswordResetRoute(),
]);
app.listen();
