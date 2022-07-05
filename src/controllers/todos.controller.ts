// RequestHandler type defines the types of Request, Response and NextFunction
import {RequestHandler} from "express"
import { Todo } from "../models/todo.model"

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
// 	Type casting to tell ts that we expect text to be string
	const text = (req.body as {text: string}).text;
	
	const newTodo = new Todo(Math.random().toString(), text);
	
	TODOS.push(newTodo);
	
	
	res.status(201).json({message: "Created a new Todo", createdTodo: newTodo});
}


export const getTodos: RequestHandler = (req,res,next) => {
	res.json({todos: TODOS});
}


export const updateTodo: RequestHandler<{id: string}> = (req,res,next) => {
	const id = req.params.id;
	
	const updatedText = (req.body as {text: string}).text;
	
	const todoIndex = TODOS.findIndex(todo => todo.id === id);
	
	if(todoIndex < 0) {
		throw new Error("Could not find todo");
	}
	
	TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText)
	
	res.json({message: "Updated", updatedTodo: TODOS[todoIndex]});
}



export const deleteTodo: RequestHandler = (req,res,next) => {
	const id = req.params.id;
	
	const todoIndex = TODOS.findIndex(todo => todo.id === id);
	
	if(todoIndex < 0) {
		throw new Error("Could not find todo");
	}
	
	TODOS.splice(todoIndex, 1)
	
	res.json({message: "Todo Deleted"})
}