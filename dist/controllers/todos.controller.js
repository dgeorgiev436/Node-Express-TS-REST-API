"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_model_1 = require("../models/todo.model");
const TODOS = [];
const createTodo = (req, res, next) => {
    // 	Type casting to tell ts that we expect text to be string
    const text = req.body.text;
    const newTodo = new todo_model_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: "Created a new Todo", createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const id = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === id);
    if (todoIndex < 0) {
        throw new Error("Could not find todo");
    }
    TODOS[todoIndex] = new todo_model_1.Todo(TODOS[todoIndex].id, updatedText);
    res.json({ message: "Updated", updatedTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const id = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === id);
    if (todoIndex < 0) {
        throw new Error("Could not find todo");
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: "Todo Deleted" });
};
exports.deleteTodo = deleteTodo;
