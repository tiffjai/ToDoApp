// pages/index.tsx
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import TodoList from '../components/TodoList';

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('/api/todos');
      const initialTodos = await res.json();
      setTodos(initialTodos);
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newTodoText }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setNewTodoText('');
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
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/todos?id=${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setTodos(todos.filter((todo) => todo.id !== id));
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