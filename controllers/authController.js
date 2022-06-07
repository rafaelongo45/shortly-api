import chalk from "chalk";

import connection from "../db.js";

export async function signup(req,res){
  const { name, email } = req.body;
  const { encryptedPassword } = res.locals;

  try {
    await connection.query(`
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3);
    `, [name, email, encryptedPassword]);

    return res.sendStatus(201);
  } catch (e) {
    console.log(chalk.bold.red('Erro no servidor'), e);
    return res.sendStatus(500);
  }
}

export async function signin(req,res){
  const { token, user } = res.locals;

  try {
    await connection.query(`
      INSERT INTO sessions ("userId", token)
      VALUES ($1, $2);
    `, [user.id, token]);

    return res.status(200).send(token);
  } catch (e) {
    console.log(chalk.bold.red('Erro no servidor'), e);
    return res.sendStatus(500);
  }
}