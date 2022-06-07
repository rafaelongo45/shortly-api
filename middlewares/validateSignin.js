import joi from "joi";
import chalk from "chalk";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import connection from "../db.js";

export function validateCredentialsFormat(req,res,next){
  const { email, password } = req.body;

  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const { error, value } = schema.validate({
    email, 
    password
  }, {abortEarly: false});

  if(error){
    const e = error.details.map(er => er.message)
    return res.status(422).send(e);
  }

  next();
}

export async function validateCredentials(req,res,next){
  const { email, password } = req.body;

  try {
    const request = await connection.query(`
      SELECT * 
      FROM users
      WHERE email = $1;
    `, [email]);

    const user = request.rows[0];

    if(!user || !bcrypt.compareSync(password, user.password)){
      return res.sendStatus(401);
    }

    const token = uuid();

    res.locals.user = user;
    res.locals.token = token;
    
    next();
  } catch (e) {
    console.log(chalk.bold.red('Erro no servidor'), e);
    return res.sendStatus(500);
  }
}