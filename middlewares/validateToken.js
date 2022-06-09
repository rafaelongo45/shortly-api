import chalk from "chalk";

import connection from "../db.js";

export async function validateToken(req,res,next){
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer', '').trim();

  if(!token){
    return res.sendStatus(401);
  }

  try {
    const request = await connection.query(`
      SELECT * 
      FROM sessions
      WHERE token = $1
    `, [token]);

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

export async function validateTokenUserRoute(req,res,next){
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer', '').trim();
  const params = [token]
  let idQuery = '';

  if(!token){
    return res.sendStatus(401);
  }

  if(req.params.id){
    idQuery = `AND "userId" = $2`
    params.push(req.params.id)
  }

  try {
    const request = await connection.query(`
      SELECT * 
      FROM sessions
      WHERE token = $1
      ${idQuery}
    `, params);

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