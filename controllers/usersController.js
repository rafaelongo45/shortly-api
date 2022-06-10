import chalk from "chalk";

import { usersRepository } from "../repositories/usersRepository.js";

export async function getUserData(req,res){
  const { id } = req.params;

  try {
    const userRequest = await usersRepository.getUserData(id)
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
    const rankingRequest = await usersRepository.getUserRanking();
    const ranking = rankingRequest.rows;

    return res.status(200).send(ranking); 
  } catch (e) {
    console.log(chalk.bold.red('Erro no servidor'), e);
    return res.sendStatus(500);
  }
}