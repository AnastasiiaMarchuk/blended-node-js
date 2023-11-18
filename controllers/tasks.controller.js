const {
  getAllTasksServices,
  getOneTaskServices,
  createTaskServices,
  updateTaskServices,
  deleteTaskServices,
} = require("../services/tasks.services");

const controllerWrapper = require("../utils/controllerWrapper");

const getAllTasks = controllerWrapper(async (req, res, _) => {
  const tasks = await getAllTasksServices();
  res.json(tasks).status(200);
});

const getOneTask = controllerWrapper(async (req, res, _) => {
  const { id } = req.params;
  const task = await getOneTaskServices(id);
  res.status(200).json(task);
});

const createTask = controllerWrapper(async (req, res, _) => {
  const newTask = await createTaskServices(req.body);
  res.status(201).json(newTask);
});

const updateTask = controllerWrapper(async (req, res, _) => {
  const { id } = req.params;
  const updatedTask = await updateTaskServices(id, req.body);
  res.status(200).json(updatedTask[id]);
});

const deleteTask = controllerWrapper(async (req, res, _) => {
  const { id } = req.params;
  await deleteTaskServices(id, req.body);
  res.sendStatus(204);
});

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
};
