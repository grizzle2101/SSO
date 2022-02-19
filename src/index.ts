import express from "express";
import {connectToMongoDB} from './startup/db';

const app = express();
const port = process.env.PORT || 3000;

connectToMongoDB();


app.get("/", (req, res) => {
  res.send("Hello world 121!");
});


app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});
