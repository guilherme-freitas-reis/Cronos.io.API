import mongoose from "mongoose";
import "moment/locale/pt-br";

const Schema = mongoose.Schema;

const Email = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
});

module.exports = mongoose.model("Email", Email);
