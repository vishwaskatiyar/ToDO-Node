const cron = require('node-cron');
const Task = require('./models/taskModel');

const scheduleTasks = async () => {
    try {
        const tasks = await Task.find();

        tasks.forEach((task) => {
            if (cron.validate(task.schedule)) {
                cron.schedule(task.schedule, () => {
                    console.log(`Executing task: ${task.name}`);
                });
                console.log(`Scheduled task: ${task.name}`);
            } else {
                console.error(`Invalid cron expression for task "${task.name}": ${task.schedule}`);
            }
        });
    } catch (err) {
        console.error('Error scheduling tasks:', err.message);
    }
};

module.exports = scheduleTasks;
