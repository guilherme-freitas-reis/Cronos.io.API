//Imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

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
mongoose.connect(
  "mongodb+srv://root:root@cronos.noosi.gcp.mongodb.net/db_cronos?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//Rotas
import newsletter from "./routes/newsletter.route";
import task from "./routes/task.route";
app.use("/newsletter", newsletter);
app.use("/task", task);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || 3000);
