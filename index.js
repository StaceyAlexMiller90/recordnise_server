const express = require("express");
const loggerMiddleWare = require("morgan");
const { PORT } = require("./config/constants");
const corsMiddleWare = require("cors");
const authRouter = require("./routers/auth");
const suggestionRouter = require("./routers/suggestions");

const app = express();

app.use(loggerMiddleWare("dev"));

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

app.use(corsMiddleWare());

app.use("/", authRouter);
app.use("/suggestion", suggestionRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

