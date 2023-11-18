const express = require("express");
const router = require("./routes/rootRouter.js");

const app = express();

const { notFoundHandler } = require("./middlewares/notFoundHandler.js");
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");

app.use(express.json());

app.use(router);

app.use(notFoundHandler);
app.use(globalErrorHandler); //завжди треба пропиусати в самому кінці, інакше помилка "падатиме" постійно

module.exports = app;
