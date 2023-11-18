const {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/tasksServices");
const controllerWrapper = require("../utils/controllerWrapper");

const getAllTasks = controllerWrapper(async (req, res) => {
  const tasks = await getAllTasksService();
  res.json(tasks).status(200);
});

const getOneTask = controllerWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await getOneTaskService(id);
  res.status(200).json(task);
});

const createTask = controllerWrapper(async (req, res) => {
  const newTask = await createTaskService(req.body);
  res.status(201).json(newTask);
});

const updateTask = controllerWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await updateTaskService(id, req.body);
  res.status(200).json(task);
});

const deleteTask = controllerWrapper(async (req, res) => {
  const { id } = req.params;
  await deleteTaskService(id);
  res.sendStatus(204);
});

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
};
