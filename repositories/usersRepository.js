import connection from "../db.js  ";

async function getUserData(id){
  return connection.query(`
    SELECT users.id, users.name, SUM(COALESCE(li.visits, 0)) as "visitCount", l.id as "linkId", 
    l."shortenedUrl" as "shortUrl", l."originalUrl" as url, l.visits as "linkVisits"
    FROM users
    LEFT JOIN links as li
    ON users.id = li."creatorId"
    LEFT JOIN links as l
    ON l."creatorId" = users.id
    WHERE users.id = $1
    GROUP BY users.id, l.id;
  `, [id]);
};

async function getUserRanking(){
  return connection.query(`
      SELECT users.id, users.name, COUNT(links.id) AS "linksCount", 
      SUM(coalesce(links.visits, 0)) AS "visitCount"
      FROM users
      LEFT JOIN links
      ON users.id = links."creatorId"
      GROUP BY users.id
      ORDER BY ("visitCount") DESC
      LIMIT 10;
    `);
};

async function checkToken(token){
  return connection.query(`
    SELECT * 
    FROM sessions
    WHERE token = $1
  `, [token]);
};

async function checkIfUserExists(id){
  return connection.query(`
    SELECT *
    FROM users
    WHERE id = $1;
  `, [id]);
}

export const usersRepository = {
  getUserData,
  getUserRanking,
  checkToken,
  checkIfUserExists
}