//Imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  next();
});

 app.use(cors());

//Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://root:root@cronos.noosi.gcp.mongodb.net/db_cronos?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//Rotas
import newsletter from "./routes/newsletter.route";
app.use("/newsletter", newsletter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || 3000);
