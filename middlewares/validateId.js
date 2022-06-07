import chalk from "chalk";

import connection from "../db.js";

export async function isIdValid(req,res,next){
  const { id } = req.params;

  try {
    const request = await connection.query(`
      SELECT *
      FROM links
      WHERE id = $1
    `, [id]);

    const selectedUrl = request.rows[0];

    if(!selectedUrl){
      return res.sendStatus(404);
    }

    res.locals.selectedUrl = selectedUrl;
    next();
  } catch (e) {
    console.log(chalk.bold.red('Erro no servidor'), e);
    return res.sendStatus(500);
  }
};