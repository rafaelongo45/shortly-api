import cors from 'cors';
import chalk from "chalk";
import dotenv from "dotenv";
import express from "express";

import authRouter from "../routers/authRouter.js";
import urlsRouter from "../routers/urlsRouter.js";
import userRouter from "../routers/usersRouter.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(urlsRouter);
app.use(userRouter);

app.listen(
  process.env.PORT || 4000,
  () => console.log(chalk.bold.blue(`Servidor rodando na porta ${process.env.PORT}`))
);