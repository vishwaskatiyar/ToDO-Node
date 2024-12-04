const express = require('express');
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

// GET all tasks
router.get('/', getTasks);

// POST a new task
router.post('/', createTask);

// PUT (update) an existing task
router.put('/:id', updateTask);

// DELETE a task
router.delete('/:id', deleteTask);

module.exports = router;
