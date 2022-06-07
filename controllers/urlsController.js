import chalk from "chalk";
import { nanoid } from "nanoid";

import connection from "../db.js";

export async function insertUrl(req,res){
  const { userId, url } = res.locals;
  const shortenedUrl = nanoid(12);
  const generatedUrl = {
    "shortUrl": shortenedUrl
  }
  
  try {
    await connection.query(`
      INSERT INTO links("creatorId", "originalUrl", "shortenedUrl")
      VALUES($1, $2, $3)
    `, [userId, url, shortenedUrl]);

    return res.status(201).send(generatedUrl);
  } catch (e) {
    console.log(chalk.bold.red('Erro no servidor'), e);
    return res.sendStatus(500);
  }
};

export function sendSelectedUrl(req,res){
  const { selectedUrl } = res.locals;
  const structuredResponse = {
    "id": selectedUrl.id,
    "shortUrl": selectedUrl.shortenedUrl,
    "url": selectedUrl.originalUrl
  }

  return res.status(200).send(structuredResponse);
};

export async function updateCountRedirectLink(req,res){
  const { linkInformation } = res.locals;

  try {
    await connection.query(`
      UPDATE links 
      SET visits = visits + 1
      WHERE id = $1
    `, [linkInformation.id]);

    res.redirect(`${linkInformation.originalUrl}`)
  } catch (e) {
    console.log(chalk.bold.red('Erro no servidor'), e);
    return res.sendStatus(500);
  }
}