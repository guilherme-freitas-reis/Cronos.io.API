import mongoose from "mongoose";
import "moment/locale/pt-br";

const Schema = mongoose.Schema;

const Newsletter = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
});

module.exports = mongoose.model("Newsletter", Newsletter);
