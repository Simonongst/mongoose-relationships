const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
    text: String,
    isComplete: Boolean,
});

const todoSchema = new mongoose.Schema({
    text: String,
    isComplete: Boolean,
    subtasks: [subtaskSchema], // embedded subtask schema
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;