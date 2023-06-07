const express = require('express');
const router = express.Router();
const Todo = require('../model/TodoModel');

// Get all todos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error('Error retrieving todos:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new todo
router.post('/todos', async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed || false
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a todo
router.patch('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.text = req.body.text || todo.text;
    todo.completed = req.body.completed || todo.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a todo
router.delete('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndRemove(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
