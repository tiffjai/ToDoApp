// pages/api/todos.ts
import type { NextApiRequest, NextApiResponse } from 'next'; 
// Think of this as setting up the types for the mail you’re about to send or receive.
// NextApiRequest is the type of incoming requests (like the envelope), and NextApiResponse is the outgoing response (like the reply envelope).

import { Todo } from '../../types/todo';
// We’re describing what kind of "letters" (data) we’ll be handling. In this case, it’s a Todo object.

import { v4 as uuidv4 } from 'uuid';
// UUID is like assigning a unique tracking number to every package (todo). Here, we use a version 4 UUID to generate unique IDs for each task.

let todos: Todo[] = [];
// This is our in-memory "storage room" for todos (like a whiteboard where we write down all our tasks).
// Right now, it’s empty, but we’ll add todos as users interact with our app.

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo[] | Todo | { message: string }>
) {
  // This handler is like a receptionist who decides what to do with each incoming request based on its type (GET, POST, PUT, DELETE).

  switch (req.method) {
    // Think of "req.method" as the type of request letter: GET (read), POST (add), PUT (update), DELETE (remove).

    case 'GET':
      // GET is like saying, "Hey, show me all the tasks on the whiteboard."
      res.status(200).json(todos);
      // The server looks at the whiteboard (our todos array) and sends it back as a response.

      break;

    case 'POST':
      // POST is like asking the receptionist, "Add this new task to the whiteboard."
      const newTodo: Todo = {
        id: uuidv4(), // Assigns a unique ID to the new task (like giving it a ticket number).
        text: req.body.text, // Takes the task description from the request body.
        completed: false, // By default, new tasks are incomplete.
      };
      todos.push(newTodo);
      // Adds the new task to the whiteboard (the todos array).

      res.status(201).json(newTodo);
      // Responds with the newly added task and a "201 Created" status to confirm it was added successfully.

      break;

    case 'PUT':
      // PUT is like saying, "Change something about an existing task on the whiteboard."
      const { id, text, completed } = req.body;
      // Extracts the task's ID, new text, and completion status from the request.

      const todoIndex = todos.findIndex((todo) => todo.id === id);
      // Finds the position of the task with the given ID on the whiteboard.

      if (todoIndex > -1) {
        // If the task exists:
        todos[todoIndex] = { id, text, completed };
        // Update the task’s details (like rewriting it on the whiteboard).
        res.status(200).json(todos[todoIndex]);
        // Respond with the updated task and a "200 OK" status.
      } else {
        // If the task isn’t found:
        res.status(404).json({ message: 'Todo not found' });
        // Respond with a "404 Not Found" status and an error message.
      }

      break;

    case 'DELETE':
      // DELETE is like saying, "Erase this task from the whiteboard."
      const { id: deleteId } = req.query;
      // The ID of the task to delete comes from the query string in the request.

      todos = todos.filter((todo) => todo.id !== deleteId);
      // Filters out the task with the matching ID (like erasing it from the whiteboard).

      res.status(200).json({ message: 'Todo deleted' });
      // Respond with a confirmation message and a "200 OK" status.

      break;

    default:
      // If the request type is something other than GET, POST, PUT, or DELETE:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      // Tell the user what methods are allowed (like putting a sign on the door listing accepted letters).

      res.status(405).end(`Method ${req.method} Not Allowed`);
      // Respond with a "405 Method Not Allowed" status if an unsupported method is used.
  }
}
