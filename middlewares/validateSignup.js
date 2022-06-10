import joi from "joi";
import chalk from "chalk";
import bcrypt from "bcrypt";

import connection from "../db.js";
import { authRepository } from "../repositories/authRepository.js";

export function validateUserData(req,res,next){
  const { name, email, password, confirmPassword } = req.body;

  const schema = joi.object({
    name: joi.string().trim().min(1).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.ref('password')
  });

  const { error, value } = schema.validate({
    name, 
    email, 
    password, 
    confirmPassword
  }, {abortEarly: false});

  if(error){
    const e = error.details.map(er => er.message)
    return res.status(422).send(e);
  }

  next();
};

export function encryptPassword(req,res,next){
  const { password } = req.body;
  const encryptedPassword = bcrypt.hashSync(password, 10);

  res.locals.encryptedPassword = encryptedPassword;
  next();
};

export async function isRegistered(req,res,next){
  const { email } = req.body;

  try {
    const user = await authRepository.checkIfRegistered(email);

    if(user.rows.length !== 0){
      return res.status(409).send('E-mail already registered');
    }

    next();
  }catch (e) {
    console.log(chalk.bold.red('Erro no servidor'), e);
    return res.sendStatus(500);
  }
};