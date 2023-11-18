const { readDb, writeDb } = require("../utils/db");
const crypto = require("node:crypto");

const getAllTasksService = async () => {
  return await readDb();
};

const getOneTaskService = async (id) => {
  const tasks = await readDb();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    throw new HttpError(404, "Task not found");
  }
  return task;
};

const createTaskService = async (data) => {
  const tasks = await readDb();
  const newTask = { ...data, id: crypto.randomUUID() };
  tasks.push(newTask);
  await writeDb(tasks);
  return newTask;
};

const updateTaskService = async (id, data) => {
  const tasks = await readDb();
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    throw new HttpError(404, "Task not found");
  }
  tasks.splice(taskIndex, 1, { ...tasks[taskIndex], ...data });
  await writeDb(tasks);
  return tasks[taskIndex];
};

const deleteTaskService = async (id) => {
  const tasks = await readDb();
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    throw new HttpError(404, "Task not found");
  }
  tasks.splice(taskIndex, 1);
  await writeDb(tasks);
};

module.exports = {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
};
