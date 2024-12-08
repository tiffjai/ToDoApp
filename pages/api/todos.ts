import type { NextApiRequest, NextApiResponse } from 'next';
import { Todo } from '../../types/todo';
import { v4 as uuidv4 } from 'uuid';

let todos: Todo[] = [];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo[] | Todo | { message: string }>
) {
  switch (req.method) {
    case 'GET':
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(todos);
      break;

    case 'POST':
      if (typeof req.body.text !== 'string' || req.body.text.trim().length === 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({ message: 'Invalid input: text must be a non-empty string' });
        break;
      }

      const newTodo: Todo = {
        id: uuidv4(),
        text: req.body.text,
        completed: false,
      };
      todos.push(newTodo);

      res.setHeader('Content-Type', 'application/json');
      res.status(201).json(newTodo);
      break;

    case 'PUT':
      const { id, text, completed } = req.body;

      if (typeof id !== 'string' || (text !== undefined && typeof text !== 'string') || (completed !== undefined && typeof completed !== 'boolean')) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({ message: 'Invalid input: id must be a string, text (if provided) must be a string, and completed (if provided) must be a boolean' });
        break;
      }

      const todoIndex = todos.findIndex((todo) => todo.id === id);

      if (todoIndex > -1) {
        todos[todoIndex] = { id, text: text || todos[todoIndex].text, completed: completed !== undefined ? completed : todos[todoIndex].completed };
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(todos[todoIndex]);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).json({ message: 'Todo not found' });
      }
      break;

    case 'DELETE':
      const { id: deleteId } = req.query;
      const deleteIdString = Array.isArray(deleteId) ? deleteId[0] : deleteId; 

      if (deleteIdString) {
        todos = todos.filter((todo) => todo.id !== deleteIdString);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: 'Todo deleted' });
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({ message: 'Invalid or missing Todo ID' }); 
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}