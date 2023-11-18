const express = require("express");
const {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");
const validateBody = require("../utils/validateBody");
const {
  createTaskValidationSchema,
  updateTaskValidationSchema,
} = require("../utils/validation/tasksValidationSchemas");

const router = express.Router();

router
  .route("/")
  .get(getAllTasks)
  .post(validateBody(createTaskValidationSchema), createTask);

router
  .route("/:id")
  .get(getOneTask)
  .patch(validateBody(updateTaskValidationSchema), updateTask)
  .delete(deleteTask);

module.exports = { tasksRouter: router };
