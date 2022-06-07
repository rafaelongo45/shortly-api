import chalk from "chalk";
import dotenv from "dotenv";
import express from "express";

import authRouter from "../routers/authRouter.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(authRouter);

app.listen(
  process.env.PORT || 4000,
  () => console.log(chalk.bold.blue(`Servidor rodando na prota ${process.env.PORT}`))
);