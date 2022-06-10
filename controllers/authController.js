import chalk from "chalk";

import { authRepository } from "../repositories/authRepository.js";

export async function signup(req,res){
  const { name, email } = req.body;
  const { encryptedPassword } = res.locals;

  try {
    await authRepository.postSignUp(name, email, encryptedPassword);
    return res.sendStatus(201);
  } catch (e) {
    console.log(chalk.bold.red('Erro no servidor'), e);
    return res.sendStatus(500);
  }
}

export async function signin(req,res){
  const { token, user } = res.locals;

  try {
    await authRepository.postSignIn(token, user);
    return res.status(200).send(token);
  } catch (e) {
    console.log(chalk.bold.red('Erro no servidor'), e);
    return res.sendStatus(500);
  }
}