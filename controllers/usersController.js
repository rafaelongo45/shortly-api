import chalk from "chalk";

import connection from "../db.js";

export async function getUserData(req,res){
  const { id } = req.params;

  try {
    const userRequest = await connection.query(`
      SELECT users.id, users.name, SUM(links.visits) as "visitCount"
      FROM users
      JOIN links
      ON users.id = $1
      GROUP BY users.id;
    `, [id]);
    const user = userRequest.rows[0];

    const userLinksRequests = await connection.query(`
      SELECT links.id, links."shortenedUrl" as "shortUrl", links."originalUrl" as url, links.visits as "visitCount"
      FROM links
      WHERE links."creatorId" = $1;
    `, [id]);
    const userLinks = userLinksRequests.rows;

    const userStructure = {
      "id": user.id,
      "name": user.name,
      "visitCount": user.visitCount,
      "shortenedUrls": userLinks
    }

    return res.status(200).send(userStructure);
  } catch (e) {
    console.log(chalk.bold.red('Erro no servidor'), e);
    return res.sendStatus(500);
  }
}