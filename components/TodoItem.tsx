// components/TodoItem.tsx
import React from 'react';
import { Todo } from '../types/todo';

type TodoItemProps = {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newText: string) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(todo.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
      )}

      <div className="buttons">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </>
        )}
      </div>

      <style jsx>{`
        .todo-item {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .todo-item input[type='checkbox'] {
          margin-right: 0.5rem;
        }

        .todo-item .completed {
          text-decoration: line-through;
          color: #999;
        }

        .todo-item .buttons {
          margin-left: auto;
        }

        .todo-item .buttons button {
          margin-left: 0.5rem;
          background-color: #f44336;
          color: white;
          border: none;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          cursor: pointer;
        }
        .todo-item .buttons button:first-child {
          background-color: #008CBA;
        }
      `}</style>
    </li>
  );
};

export default TodoItem;