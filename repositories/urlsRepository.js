import connection from "../db.js";

async function postUrl(userId, url, shortenedUrl){
  return connection.query(`
    INSERT INTO links("creatorId", "originalUrl", "shortenedUrl")
    VALUES($1, $2, $3)
  `, [userId, url, shortenedUrl]);
};

async function updateCount(linkInformation){
  return connection.query(`
    UPDATE links 
    SET visits = visits + 1
    WHERE id = $1
  `, [linkInformation.id]);
};

async function deleteLink(selectedUrl){
  return connection.query(`
    DELETE FROM links
    WHERE id = $1;
  `, [selectedUrl.id]);
};

async function checkUrl(shortUrl){
  return connection.query(`
    SELECT * 
    FROM links
    WHERE "shortenedUrl" = $1;
  `, [shortUrl]);
};

async function checkCreator(userId){
  return connection.query(`
    SELECT *
    FROM links
    WHERE "creatorId" = $1;
  `, [userId]);
}

export const urlsRepository = {
  postUrl,
  updateCount,
  deleteLink,
  checkUrl,
  checkCreator
};