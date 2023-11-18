const express = require("express");
const router = require("./routes/rootRouter");
const { notFoundHandler } = require("./middlewares/notFoundHandler");
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");

const app = express();

app.use(express.json());
app.use(router);

app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;
