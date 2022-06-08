import chalk from "chalk";

import connection from "../db.js";

export async function userExists(req,res,next){
  const { id } = req.params;

  try {
    const request = await connection.query(`
      SELECT *
      FROM users
      WHERE id = $1;
    `, [id]);

    const users = request.rows[0];

    if(!users){
      return res.sendStatus(404);
    }
    
    next();
  } catch (e) {
    console.log(chalk.bold.red('Erro no servidor'), e);
    return res.sendStatus(500);
  }
}