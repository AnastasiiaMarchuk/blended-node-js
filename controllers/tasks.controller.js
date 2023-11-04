const { readDb, writeDb } = require('../utils/db')
const crypto = require("node:crypto");
const { createTaskValidationSchema, updateTaskValidationSchema } = require('../utils/validation/tasksValidationSchemas');

const getAllTasks = async (req, res, next) => {
    const tasks = await readDb();
    res.json(tasks).status(200)
}

const getOneTask = async (req, res, next) => {
    const tasks = await readDb();
    const { id } = req.params;
    const task = tasks.find(task => task.id === id)
    if (!task) {
        return res.status(404).json({message: 'Task not found'})
    }
    res.status(200).json(task)
}

const createTask = async (req, res, next) => {
    const { error } = createTaskValidationSchema.validate(req.body);
    if (error) {
        return res.status(422).json({ message: `${error}` }) //406
    }
    const tasks = await readDb();
    const newTask = { ...req.body, id: crypto.randomUUID() };
    tasks.push(newTask)
    await writeDb(tasks)
    res.status(201).json(newTask)
}

const updateTask = async (req, res, next) => {
    const { error } = updateTaskValidationSchema.validate(req.body);
    if (error) {
        return res.status(422).json({ message: `${error}` }) //406
    }
    const tasks = await readDb();
    const { id } = req.params;
    const taskIndex = tasks.findIndex((task) => task.id === id)
    if (taskIndex === -1) {
        return res.status(404).json({message: 'Task not found'})
    }
    tasks.splice(taskIndex, 1, { ...tasks[taskIndex], ...req.body })
    await writeDb(tasks)
    res.status(200).json(tasks[taskIndex])
}

const deleteTask = async (req, res, next) => {
    const tasks = await readDb();
    const { id } = req.params;
        const taskIndex = tasks.findIndex((task) => task.id === id)
    if (taskIndex === -1) {
        return res.status(404).json({message: 'Task not found'})
    }
    tasks.splice(taskIndex, 1)
    await writeDb(tasks)
    res.sendStatus(204)
}

module.exports = {getAllTasks, getOneTask, createTask, updateTask, deleteTask}