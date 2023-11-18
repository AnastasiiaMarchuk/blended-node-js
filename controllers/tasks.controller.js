const { readDb, writeDb } = require("../utils/db");
const crypto = require("node:crypto");
const { createTaskValidationSchema, updateTaskValidationSchema } = require("../utils/validation/tasksValidationSchemas");
const { HttpError } = require("../utils/HttpError");
const { getAllTasksService, getOneTaskService, createTaskService, updateTaskService } = require("../services/tasksServices");

const getAllTasks = async (req, res, next) => {
   const tasks = await getAllTasksService();
   res.json(tasks).status(200);
};

const getOneTask = async (req, res, next) => {
   try {
      const { id } = req.params;
      const task = await getOneTaskService();
      res.status(200).json(task);
   } catch (error) {
      next(error);
   }
};

const createTask = async (req, res, next) => {
   try {
      const newTask = await createTaskService(req.body);
      res.status(201).json(newTask);
   } catch (error) {
      next(error);
   }
};

const updateTask = async (req, res, next) => {
   try {
      const { id } = req.params;
      const task = await updateTaskService(id, req.body);
      res.status(200).json(task);
   } catch (error) {
      next(error);
   }
};

const deleteTask = async (req, res, next) => {
    const { id } = req.params;
   const tasks = await readDb();
   const taskIndex = tasks.findIndex((task) => task.id === id);
   if (taskIndex === -1) {
      return next(new HttpError(404, "Task not found"));
   }
   tasks.splice(taskIndex, 1);
   await writeDb(tasks);
   res.sendStatus(204);
};

module.exports = { getAllTasks, getOneTask, createTask, updateTask, deleteTask };
