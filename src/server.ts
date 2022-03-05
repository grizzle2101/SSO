import App from "./app";
import { UsersRoute } from "./routes/users.route";

const app = new App([new UsersRoute()]);
app.listen();
