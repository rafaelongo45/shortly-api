import chalk from "chalk";

import { usersRepository } from "../repositories/usersRepository.js";

export async function validateToken(req,res,next){
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer', '').trim();

  if(!token){
    return res.sendStatus(401);
  }

  try {
    const request = await usersRepository.checkToken(token);

    const userSession = request.rows[0];

    if(!userSession){
      return res.sendStatus(401);
    }
    
    res.locals.userId = userSession.userId;
    
    next();
  } catch (e) {
    console.log(chalk.bold.red('Erro no servidor'), e);
    return res.sendStatus(500);
  }
};