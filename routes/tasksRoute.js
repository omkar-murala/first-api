// module.exports = router;
const express = require('express');
const router = express.Router();
const tasks = require('../tasks.json'); // Import the tasks data from tasks.json

// GET /tasks: Retrieve all tasks.
router.get('/', (req, res) => {
    res.json(tasks);
});

// GET /tasks/:id: Retrieve a single task by its ID.
router.get('/:id', (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find((task) => task.id === taskId);

if (!task) {
    return res.status(404).json({ message: 'Task not found' });
}

    res.json(task);
});

// POST /tasks: Create a new task.
router.post('/', (req, res) => {
    const { title, description, completion } = req.body;

    if (!title || !description || typeof completion !== 'boolean') {
        return res.status(400).json({ message: 'Invalid input' });
    }

    const newTask = {
        id: (tasks.length + 1).toString(),
        title,
        description,
        completion,
};

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /tasks/:id: Update an existing task by its ID.
router.put('/:id', (req, res) => {
const taskId = req.params.id;
const task = tasks.find((task) => task.id === taskId);

if (!task) {
    return res.status(404).json({ message: 'Task not found' });
    }

    const { title, description, completion } = req.body;

    if (!title || !description || typeof completion !== 'boolean') {
        return res.status(400).json({ message: 'Invalid input' });
    }

    task.title = title;
    task.description = description;
    task.completion = completion; 

    res.json(task);
});

// DELETE /tasks/:id: Delete a task by its ID.
// router.delete('/:id', (req, res) => {
//     const taskId = req.params.id;
//     tasks = tasks.filter((task) => task.id !== taskId);
//     res.json({ message: 'Task deleted successfully' });
// });

router.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    res.json({ message: 'Task deleted successfully' });

    // If you want to update the tasks array after deletion:
    tasks.length = 0;
    tasks.push(...filteredTasks);
});


// export statement
module.exports = router; 
