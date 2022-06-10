import chalk from "chalk";

import connection from "../db.js";

export async function getUserData(req,res){
  const { id } = req.params;

  try {
    const userRequest = await connection.query(`
    SELECT users.id, users.name, SUM(COALESCE(li.visits, 0)) as "visitCount", l.id as "linkId", l."shortenedUrl" as "shortUrl", l."originalUrl" as url, l.visits as "linkVisits"
    FROM users
    LEFT JOIN links as li
    ON users.id = li."creatorId"
    LEFT JOIN links as l
    ON l."creatorId" = users.id
    WHERE users.id = $1
    GROUP BY users.id, l.id;
    `, [id]);
    const userData = userRequest.rows;

    const userLinks = [];

    userData.forEach(userData => {
      if(userData.linkId === null){
        return
      }
      
      userLinks.push({
          id: userData.linkId,
          shortUrl: userData.shortUrl,
          url: userData.url,
          visitCount: userData.linkVisits
      })
    })

    const userStructure = {
      "id": userData[0].id,
      "name": userData[0].name,
      "visitCount": userData.visitCount,
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