import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import TodoList from '../components/TodoList';
import '../styles/globals.css';
const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Your full-stack schedule as 30 pre-defined todos
  const fullStackSchedule: Todo[] = [
    { id: '1', text: 'Day 1: Set up Next.js project', completed: false },
    { id: '2', text: 'Day 2: Learn React basics', completed: false },
    { id: '3', text: 'Day 3: Understand React state and props', completed: false },
    { id: '4', text: 'Day 4: Learn about hooks (useState, useEffect)', completed: false },
    { id: '5', text: 'Day 5: Build a simple Todo app', completed: false },
    { id: '6', text: 'Day 6: Integrate CSS into the project', completed: false },
    { id: '7', text: 'Day 7: Explore Next.js API routes', completed: false },
    { id: '8', text: 'Day 8: Connect frontend with API endpoints', completed: false },
    { id: '9', text: 'Day 9: Learn about database integration (e.g., MongoDB)', completed: false },
    { id: '10', text: 'Day 10: Create CRUD operations', completed: false },
    { id: '11', text: 'Day 11: Understand server-side rendering (SSR)', completed: false },
    { id: '12', text: 'Day 12: Dive into static site generation (SSG)', completed: false },
    { id: '13', text: 'Day 13: Learn about authentication (e.g., JWT)', completed: false },
    { id: '14', text: 'Day 14: Implement user authentication', completed: false },
    { id: '15', text: 'Day 15: Explore state management (e.g., Redux)', completed: false },
    { id: '16', text: 'Day 16: Apply state management to the app', completed: false },
    { id: '17', text: 'Day 17: Study deployment basics', completed: false },
    { id: '18', text: 'Day 18: Deploy app to Vercel', completed: false },
    { id: '19', text: 'Day 19: Optimize app performance', completed: false },
    { id: '20', text: 'Day 20: Add testing (e.g., Jest)', completed: false },
    { id: '21', text: 'Day 21: Write unit tests for components', completed: false },
    { id: '22', text: 'Day 22: Learn about TypeScript in React', completed: false },
    { id: '23', text: 'Day 23: Refactor app with TypeScript', completed: false },
    { id: '24', text: 'Day 24: Explore GraphQL basics', completed: false },
    { id: '25', text: 'Day 25: Integrate GraphQL with the app', completed: false },
    { id: '26', text: 'Day 26: Add advanced features (e.g., real-time updates)', completed: false },
    { id: '27', text: 'Day 27: Improve app UI and UX', completed: false },
    { id: '28', text: 'Day 28: Study CI/CD pipelines', completed: false },
    { id: '29', text: 'Day 29: Implement CI/CD for the app', completed: false },
    { id: '30', text: 'Day 30: Final review and polish', completed: false },
  ];

  // Initialize the schedule into the todos state
  useEffect(() => {
    setTodos(fullStackSchedule); // Set the schedule as the initial todos
  }, []);

  const handleToggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id)); // Remove the todo from the state
  };

  const handleUpdate = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <div className="container">
      <h1>Full-Stack Developer 30-Day Schedule</h1>

      <TodoList
        todos={todos}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />

   
    </div>
  );
};

export default Home;
