//Imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv_flow from "dotenv-flow";
dotenv_flow.config();

const app = express();
app.options("*", cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
  res.header("Content-Type", "application/json");
  next();
});

//Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Rotas
import newsletter from "./routes/newsletter.route";
import task from "./routes/task.route";
app.use("/newsletter", newsletter);
app.use("/task", task);

app.get("/", (req, res) => {
  res.send("Hello World");
});

import send_daily_email from "./jobs/send_daily_email";
send_daily_email();

app.listen(process.env.PORT || 3000);
