import mongoose from "mongoose";
import moment from "moment";
import "moment/locale/pt-br";

const Schema = mongoose.Schema;

const Task = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    start: {
      type: Date,
      default: moment().toDate(),
      required: true,
    },
    end: {
      type: Date,
      default: moment().toDate(),
      required: true,
    },
  },
});

module.exports = mongoose.model("Task", Task);