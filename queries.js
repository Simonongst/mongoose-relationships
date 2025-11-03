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

/*------------------------------- Run Queries -------------------------------*/

const runQueries = async () => {
    console.log('Queries running.');
    await createTodo();
}