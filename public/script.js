const taskForm = document.getElementById('taskForm');
const taskTableBody = document.querySelector('#taskTable tbody');

// API Base URL
const API_URL = '/api/tasks';

// Fetch and display tasks
const fetchTasks = async () => {
    try {
        const res = await fetch(API_URL);
        const tasks = await res.json();

        // Clear existing rows
        taskTableBody.innerHTML = '';

        // Add rows for each task
        tasks.forEach((task) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.name}</td>
                <td>${task.schedule}</td>
                <td>${task.status}</td>
                <td>
                    <button onclick="deleteTask('${task._id}')">Delete</button>
                    <button onclick="updateTask('${task._id}')">Edit</button>
                </td>
            `;
            taskTableBody.appendChild(row);
        });
    } catch (err) {
        console.error('Error fetching tasks:', err);
    }
};

// Add a new task
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const task = {
        name: document.getElementById('taskName').value,
        schedule: document.getElementById('taskSchedule').value,
        status: document.getElementById('taskStatus').value,
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });
        fetchTasks();
        taskForm.reset();
    } catch (err) {
        console.error('Error adding task:', err);
    }
});

// Delete a task
const deleteTask = async (id) => {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchTasks();
    } catch (err) {
        console.error('Error deleting task:', err);
    }
};

// Update a task (example implementation for editing)
const updateTask = async (id) => {
    const newStatus = prompt('Enter new status (active/inactive):', 'active');
    if (!newStatus) return;

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });
        fetchTasks();
    } catch (err) {
        console.error('Error updating task:', err);
    }
};

// Initial fetch
fetchTasks();
