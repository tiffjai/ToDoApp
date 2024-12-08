// Importing the NextPage type for defining this page as a Next.js page component
import type { NextPage } from 'next';
// Importing useState and useEffect from React for managing state and side effects
import { useState, useEffect } from 'react';
// Importing the Todo type to define the shape of a Todo item
import { Todo } from '../types/todo';
// Importing the TodoList component to display the list of todos
import TodoList from '../components/TodoList';

// Declaring the Home component, which represents the main page of the app
const Home: NextPage = () => {
  // State to hold the list of todos
  const [todos, setTodos] = useState<Todo[]>([]);
  // State to hold the text for a new todo being added
  const [newTodoText, setNewTodoText] = useState('');

  // useEffect to fetch the initial list of todos when the component loads
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('/api/todos'); // Fetching todos from the backend API
      const initialTodos = await res.json(); // Converting the response to JSON
      setTodos(initialTodos); // Storing the todos in state
    };

    fetchTodos(); // Calling the function
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Function to handle adding a new todo
  const handleAddTodo = async () => {
    const res = await fetch('/api/todos', {
      method: 'POST', // Sending a POST request to the API to add a new todo
      headers: {
        'Content-Type': 'application/json', // Specifying the content type as JSON
      },
      body: JSON.stringify({ text: newTodoText }), // Sending the new todo text in the request body
    });
    const newTodo = await res.json(); // Parsing the response to get the new todo
    setTodos([...todos, newTodo]); // Adding the new todo to the state
    setNewTodoText(''); // Clearing the input field
  };

  // Function to handle toggling the completion status of a todo
  const handleToggleComplete = async (id: string) => {
    const todoToUpdate = todos.find((todo) => todo.id === id); // Finding the todo to update
    if (!todoToUpdate) return; // If the todo doesn't exist, do nothing

    const res = await fetch('/api/todos', {
      method: 'PUT', // Sending a PUT request to update the todo
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...todoToUpdate, // Sending the todo object with updated completed status
        completed: !todoToUpdate.completed,
      }),
    });

    if (res.ok) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      ); // Updating the state with the toggled todo
    }
  };

  // Function to handle deleting a todo
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/todos?id=${id}`, {
      method: 'DELETE', // Sending a DELETE request to remove the todo
    });

    if (res.ok) {
      setTodos(todos.filter((todo) => todo.id !== id)); // Removing the todo from the state
    }
  };

  // Function to handle updating the text of a todo
  const handleUpdate = async (id: string, newText: string) => {
    const todoToUpdate = todos.find((todo) => todo.id === id); // Finding the todo to update
    if (!todoToUpdate) return; // If the todo doesn't exist, do nothing

    const res = await fetch('/api/todos', {
      method: 'PUT', // Sending a PUT request to update the todo text
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...todoToUpdate, // Sending the updated todo object
        text: newText,
      }),
    });

    if (res.ok) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo
        )
      ); // Updating the state with the modified todo
    }
  };

  // Rendering the component's UI
  return (
    <div className="container">
      <h1>My To-Do App</h1>

      {/* Input field and button to add a new todo */}
      <div className="add-todo">
        <input
          type="text" // Input type is text
          placeholder="Add a to-do" // Placeholder text shown when the input is empty
          value={newTodoText} // Binding the input's value to the state
          onChange={(e) => setNewTodoText(e.target.value)} // Updating the state as the user types
        />
        <button onClick={handleAddTodo}>Add</button> {/* Button to trigger adding a new todo */}
      </div>

      {/* Rendering the TodoList component with the todos and action handlers */}
      <TodoList
        todos={todos} // Passing the todos array
        onToggleComplete={handleToggleComplete} // Passing the toggle complete function
        onDelete={handleDelete} // Passing the delete function
        onUpdate={handleUpdate} // Passing the update function
      />

      {/* Inline styles for this component */}
      <style jsx>{`
        .container {
          max-width: 600px; // Limit the width of the container
          margin: 0 auto; // Center the container
          padding: 2rem; // Add spacing around the content
          font-family: sans-serif; // Set the font for the app
        }

        .add-todo {
          display: flex; // Align the input and button horizontally
          margin-bottom: 1rem; // Add spacing below the input and button
        }

        .add-todo input {
          flex-grow: 1; // Make the input take up remaining space
          margin-right: 0.5rem; // Add spacing between the input and button
          padding: 0.5rem; // Add inner spacing in the input
          border: 1px solid #ccc; // Light gray border
          border-radius: 4px; // Round the corners
        }

        .add-todo button {
          background-color: #4caf50; // Green background
          color: white; // White text
          border: none; // Remove default border
          padding: 0.5rem 1rem; // Add spacing inside the button
          border-radius: 4px; // Round the corners
          cursor: pointer; // Pointer cursor on hover
        }
      `}</style>
    </div>
  );
};

// Exporting the Home component as the default export for this page
export default Home;
