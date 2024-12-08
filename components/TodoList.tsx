// components/TodoList.tsx
import React from 'react';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

type TodoListProps = {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newText: string) => void;
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleComplete,
  onDelete,
  onUpdate,
}) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
      <style jsx>{`
        ul {
          list-style: none;
          padding: 0;
        }
      `}</style>
    </ul>
  );
};

export default TodoList;