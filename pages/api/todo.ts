// pages/api/todos.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Todo } from '../../types/todo';
import { v4 as uuidv4 } from 'uuid';

// In-memory "database" (replace with actual database later)
let todos: Todo[] = [];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo[] | Todo | { message: string }>
) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(todos);
      break;
    case 'POST':
      const newTodo: Todo = {
        id: uuidv4(),
        text: req.body.text,
        completed: false,
      };
      todos.push(newTodo);
      res.status(201).json(newTodo);
      break;
    case 'PUT':
      const { id, text, completed } = req.body;
      const todoIndex = todos.findIndex((todo) => todo.id === id);
      if (todoIndex > -1) {
        todos[todoIndex] = { id, text, completed };
        res.status(200).json(todos[todoIndex]);
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
      break;
    case 'DELETE':
      const { id: deleteId } = req.query;
      todos = todos.filter((todo) => todo.id !== deleteId);
      res.status(200).json({ message: 'Todo deleted' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}