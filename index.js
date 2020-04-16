const dotenv = require("dotenv");
const express = require("express");
const loggerMiddleWare = require("morgan");
const { PORT } = require("./config/constants");
const corsMiddleWare = require("cors");
const authRouter = require("./routers/auth");

dotenv.config();

const app = express();

app.use(loggerMiddleWare("dev"));

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

app.use(corsMiddleWare());

app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

