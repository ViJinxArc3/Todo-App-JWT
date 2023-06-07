import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [updatedTodoText, setUpdatedTodoText] = useState('');
  const navigate = useNavigate();

  // Fetch all todos from the backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/api/todos');
        setTodos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, []);

  // Create a new todo
  const createTodo = async () => {
    try {
      const response = await axios.post('/api/todos', {
        text: newTodoText,
        completed: false
      });
      const newTodo = response.data;
      setTodos([...todos, newTodo]);
      setNewTodoText('');
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Update a todo
  const updateTodo = async () => {
    try {
      const updatedTodo = await axios.patch(`/api/todos/${editingTodoId}`, {
        text: updatedTodoText
      });
      setTodos(todos.map(todo => (todo._id === editingTodoId ? updatedTodo.data : todo)));
      setEditingTodoId(null);
      setUpdatedTodoText('');
    } catch (error) {
      console.error(error);
    }
  };

  // Enable editing mode for a todo
  const enableEdit = (id, text) => {
    setEditingTodoId(id);
    setUpdatedTodoText(text);
  };

  // Cancel editing mode
  const cancelEdit = () => {
    setEditingTodoId(null);
    setUpdatedTodoText('');
  };


    // Logout
    const handleLogout = () => {
      navigate('/login');
    };

  return (
    <div className="todo-container">
      <h2>Welcome to your Todo List!</h2>
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={event => setNewTodoText(event.target.value)}
        />
        <button onClick={createTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {editingTodoId === todo._id ? (
              <>
                <input
                className='input'
                  type="text"
                  value={updatedTodoText}
                  onChange={event => setUpdatedTodoText(event.target.value)}
                />
                <button onClick={updateTodo}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => enableEdit(todo._id, todo.text)}>Edit</button>
                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="logout-button">
    <button onClick={handleLogout}>Logout</button>
  </div>
    </div>
  );
};

export default TodoPage;
