// Importing React from the React library
import React from 'react';
// Importing the Todo type to ensure the component understands the structure of a Todo object
import { Todo } from '../types/todo';

// Defining the type (shape) of the props this component will accept
type TodoItemProps = {
  todo: Todo; // A single Todo item
  onToggleComplete: (id: string) => void; // Function to toggle the completion status of a todo
  onDelete: (id: string) => void; // Function to delete a todo
  onUpdate: (id: string, newText: string) => void; // Function to update a todo's text
};

// Declaring the TodoItem component as a functional component (React.FC) with the props type
const TodoItem: React.FC<TodoItemProps> = ({
  todo, // The current todo item being passed in
  onToggleComplete, // Function to toggle the "completed" state
  onDelete, // Function to delete this specific todo
  onUpdate, // Function to update the text of this todo
}) => {
  // `isEditing` determines if the item is being edited, initialized as false
  const [isEditing, setIsEditing] = React.useState(false);
  // `editText` holds the text being edited, initialized to the current todo's text
  const [editText, setEditText] = React.useState(todo.text);

  // Function to switch to edit mode
  const handleEdit = () => {
    setIsEditing(true); // Change the state to editing
  };

  // Function to save the edited text
  const handleSave = () => {
    onUpdate(todo.id, editText); // Call the onUpdate function with the new text
    setIsEditing(false); // Exit editing mode
  };

  // Function to cancel editing and reset the text to its original value
  const handleCancel = () => {
    setIsEditing(false); // Exit editing mode
    setEditText(todo.text); // Reset the text to the original value
  };

  // What the component will render on the screen
  return (
    <li className="todo-item">
      {/* Checkbox to toggle the completion status of the todo */}
      <input
        type="checkbox"
        checked={todo.completed} // Marked as checked if the todo is completed
        onChange={() => onToggleComplete(todo.id)} // Call the toggle function on change
      />

      {/* If in editing mode, show an input field; otherwise, show the text */}
      {isEditing ? (
        <input
          type="text"
          value={editText} // The value of the text being edited
          onChange={(e) => setEditText(e.target.value)} // Update the state as the user types
        />
      ) : (
        <span className={todo.completed ? 'completed' : ''}>{todo.text}</span> // Display the todo text; apply a "completed" style if done
      )}

      {/* Buttons for edit/save/cancel/delete actions */}
      <div className="buttons">
        {isEditing ? (
          <>
            {/* Save button to confirm edits */}
            <button onClick={handleSave}>Save</button>
            {/* Cancel button to exit edit mode without saving */}
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            {/* Edit button to enter editing mode */}
            <button onClick={handleEdit}>Edit</button>
            {/* Delete button to remove the todo */}
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </>
        )}
      </div>

   
    </li>
  );
};

// Exporting the TodoItem component for use in other parts of the app
export default TodoItem;
