import chalk from "chalk";

import connection from "../db.js";

export async function getUserData(req,res){
  const { id } = req.params;

  try {
    const userRequest = await connection.query(`
    SELECT users.id, users.name, SUM(COALESCE(links.visits, 0)) as "visitCount"
    FROM users
    LEFT JOIN links
    ON users.id = links."creatorId"
    WHERE users.id = $1
    GROUP BY users.id;
    `, [id]);
    const user = userRequest.rows[0];
    console.log(user)

    const userLinksRequest = await connection.query(`
      SELECT links.id, links."shortenedUrl" as "shortUrl", links."originalUrl" as url, links.visits as "visitCount"
      FROM links
      WHERE links."creatorId" = $1;
    `, [id]);
    const userLinks = userLinksRequest.rows;

    const userStructure = {
      "id": user.id,
      "name": user.name,
      "visitCount": user.visitCount,
      "shortenedUrls": userLinks
    };

    return res.status(200).send(userStructure);
  } catch (e) {
    console.log(chalk.bold.red('Erro no servidor'), e);
    return res.sendStatus(500);
  }
}

export async function getRanking(req,res){

  try {
    const rankingRequest = await connection.query(`
      SELECT users.id, users.name, COUNT(links.id) AS "linksCount", 
      SUM(coalesce(links.visits, 0)) AS "visitCount"
      FROM users
      LEFT JOIN links
      ON users.id = links."creatorId"
      GROUP BY users.id
      ORDER BY ("visitCount") DESC
      LIMIT 10;
    `);
    const ranking = rankingRequest.rows;

    return res.status(200).send(ranking); 
  } catch (e) {
    console.log(chalk.bold.red('Erro no servidor'), e);
    return res.sendStatus(500);
  }
}