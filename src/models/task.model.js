import mongoose from "mongoose";

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
      default: new Date(),
      required: false,
    },
    end: {
      type: Date,
      default: new Date(),
      required: false,
    },
  },
});

module.exports = mongoose.model("Task", Task);
