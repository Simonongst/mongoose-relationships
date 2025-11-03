/*------------------------------ Starter Code ------------------------------*/

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const Todo = require("./models/todo.js");

const connect = async (req, res) => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await runQueries();

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit();
};

connect();

/*----------------------------- Query Functions -----------------------------*/

const createTodo = async () => {
    const todoData = {
        text: 'learn React',
        isComplete: false,
    };
    const todo = await Todo.create(todoData);
    console.log('New todo', todo);
};

const findTodos = async () => {
    const todos = await Todo.find({});
    console.log('All todo:', todos);
};

const createSubtask = async () => {
  // Assume that the todo we want to create a
  // sub-task for has the following id:
  const todoId = "6908b340aa42360b5575db74";
  // Look up the todo by id, assign the returned object to `todo`
  const todo = await Todo.findById(todoId);

  const subtaskData = {
    text: "Learn how props work",
    isComplete: false,
  };

  // Push the new sub-task data into the subtasks array on the todo:
  const subtask = todo.subtasks.push(subtaskData);
  // Save the parent document:
  await todo.save();
  console.log("Modified todo:", todo);
};

const findSubtask = async () => {
    const todoId = '6908b340aa42360b5575db74';
    const subtaskId = '6908b6d66255d32083273378';

    const todo = await Todo.findById(todoId);
    const subtask = todo.subtasks.id(subtaskId);

    console.log('Subdocument', subtask);
};

const removeSubtask = async () => {
    const todoId = '6908b340aa42360b5575db74';
    const subtaskId = '6908b6d66255d32083273378';

    const todo = await Todo.findById(todoId);
    todo.subtasks.pull(subtaskId);
    await todo.save();

    console.log('Updated document', todo);
};

const updateSubtask = async () => {
    const todoId = '6908b340aa42360b5575db74';
    const subtaskId = '6908ba1c441ba78a3a35298e';

    const todo = await Todo.findById(todoId);
    const subtask = todo.subtasks.id(subtaskId);

    subtask.isComplete = true;
    await todo.save();

    console.log('Updated document', todo);
};

const findParentAndRemoveSubtask = async () => {
    const foundTodo = await Todo.findOne({
        'subtasks.text': 'Learn how props work'
    });

    const foundSubtask = foundTodo.subtasks.find((subtask) => {
        return subtask.text === 'Learn how props work'
    });

    foundSubtask.deleteOne();

    await foundTodo.save();
    console.log('Updated todo:', foundTodo);
};

/*------------------------------- Run Queries -------------------------------*/

const runQueries = async () => {
  console.log("Queries running.");
  await findParentAndRemoveSubtask();
};