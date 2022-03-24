import App from "./app";
import { UsersRoute } from "./routes/users.route";
import { LoginRoute } from "./routes/login.route";
import dotenv from "dotenv";

dotenv.config();
const app = new App([new UsersRoute(), new LoginRoute()]);
app.listen();
