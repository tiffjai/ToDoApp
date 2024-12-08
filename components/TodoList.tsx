// Importing React library to use its functionalities for creating components
import React from 'react';
// Importing the Todo type to define the shape of a Todo item
import { Todo } from '../types/todo';
// Importing the TodoItem component to display individual to-do items
import TodoItem from './TodoItem';

// Defining the properties (props) that the TodoList component will accept
type TodoListProps = {
  todos: Todo[]; // A list (array) of Todo items
  onToggleComplete: (id: string) => void; // A function to toggle the completion status of a todo
  onDelete: (id: string) => void; // A function to delete a todo
  onUpdate: (id: string, newText: string) => void; // A function to update a todo's text
};

// Declaring the TodoList component using React.FC (Functional Component) with the defined props
const TodoList: React.FC<TodoListProps> = ({
  todos, // The array of todo items passed to the component
  onToggleComplete, // The function to handle toggling a todo's completion status
  onDelete, // The function to handle deleting a todo
  onUpdate, // The function to handle updating a todo's text
}) => {
  return (
    // Rendering an unordered list (HTML <ul> tag) to contain the todo items
    <ul>
      {/* Loop through the `todos` array and render a TodoItem for each todo */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id} // Unique key to help React identify and optimize rendering of list items
          todo={todo} // The current todo object being passed to TodoItem
          onToggleComplete={onToggleComplete} // Pass the toggle function to TodoItem
          onDelete={onDelete} // Pass the delete function to TodoItem
          onUpdate={onUpdate} // Pass the update function to TodoItem
        />
      ))}

      {/* Inline CSS styles specific to this component */}
      <style jsx>{`
        ul {
          list-style: none; // Removes default bullet points from the list
          padding: 0; // Removes default padding from the list
        }
      `}</style>
    </ul>
  );
};

// Exporting the TodoList component so it can be used in other parts of the application
export default TodoList;
