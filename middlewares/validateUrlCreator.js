import chalk from "chalk";

import { urlsRepository } from "../repositories/urlsRepository.js";

export async function isUrlCreator(req,res,next){
  const { id } = req.params;
  const { userId } = res.locals;

  try {
    const request = await urlsRepository.checkCreator(userId);
    const userUrls = request.rows;
    const selectedUrl = userUrls.find(url => url.id === parseInt(id));

    if(!selectedUrl){
      return res.sendStatus(401);
    }

    res.locals.selectedUrl = selectedUrl;
    next();
  } catch (e) {
    console.log(chalk.bold.red('Erro no servidor'), e);
    return res.sendStatus(500);
  }
}