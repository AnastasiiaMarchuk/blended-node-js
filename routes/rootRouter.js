const express = require("express");
const { tasksRouter } = require("./tasks");

const router = express.Router();

router.use("/tasks", tasksRouter);

module.exports = router;
