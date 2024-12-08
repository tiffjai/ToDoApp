// pages/index.tsx
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import TodoList from '../components/TodoList';

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');

  // useEffect to fetch the initial list of todos when the component loads
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('/api/todos');
      if (res.ok) {
        const initialTodos = await res.json();
        setTodos(initialTodos);
      } else {
        console.error("Failed to fetch todos:", res.status);
      }
    };

    fetchTodos(); // Call the fetchTodos function within useEffect
  }, []); // The empty dependency array ensures this effect runs only once after the initial render

  const handleAddTodo = async () => {
    if (newTodoText.trim() === "") return; // Prevent adding empty todos

    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newTodoText }),
    });

    if (res.ok) {
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setNewTodoText('');
    } else {
      console.error("Failed to add todo:", res.status);
    }
  };

  const handleToggleComplete = async (id: string) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const res = await fetch('/api/todos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      }),
    });

    if (res.ok) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } else {
      console.error("Failed to update todo:", res.status);
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/todos?id=${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setTodos(todos.filter((todo) => todo.id !== id));
    } else {
      console.error("Failed to delete todo:", res.status);
    }
  };

  const handleUpdate = async (id: string, newText: string) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const res = await fetch('/api/todos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...todoToUpdate,
        text: newText,
      }),
    });

    if (res.ok) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo
        )
      );
    } else {
      console.error("Failed to update todo:", res.status);
    }
  };

  return (
    <div className="container">
      <h1>My To-Do App</h1>

      <div className="add-todo">
        <input
          type="text"
          placeholder="Add a to-do"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <TodoList
        todos={todos}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />

      {/* Inline styles (unchanged) */}
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
          font-family: sans-serif;
        }

        .add-todo {
          display: flex;
          margin-bottom: 1rem;
        }

        .add-todo input {
          flex-grow: 1;
          margin-right: 0.5rem;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .add-todo button {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Home;