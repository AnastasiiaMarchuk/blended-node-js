const { HttpError } = require("../utils/HttpError");
const { readDb, writeDb } = require("../utils/db");

const crypto = require("node:crypto");

async function getAllTasksServices() {
  return await readDb();
}

async function getOneTaskServices(id) {
  const tasks = await readDb();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    throw new HttpError(404, "Task not found");
  }
  return task;
}

async function createTaskServices(body) {
  const tasks = await readDb();

  const newTask = { ...body, id: crypto.randomUUID() };

  tasks.push(newTask);
  await writeDb(tasks);
  return newTask;
}

async function updateTaskServices(id, body) {
  const tasks = await readDb();

  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    throw new HttpError(404, "Task not found");
  }
  tasks.splice(taskIndex, 1, { ...tasks[taskIndex], ...body });
  await writeDb(tasks);

  return tasks[taskIndex];
}

async function deleteTaskServices(id) {
  const tasks = await readDb();

  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    throw new HttpError(404, "Task not found");
  }
  tasks.splice(taskIndex, 1);
  await writeDb(tasks);
}

module.exports = {
  getAllTasksServices,
  getOneTaskServices,
  createTaskServices,
  updateTaskServices,
  deleteTaskServices,
};
