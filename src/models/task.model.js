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
  start: {
    type: Date,
    required: false,
  },
  end: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("Task", Task);
