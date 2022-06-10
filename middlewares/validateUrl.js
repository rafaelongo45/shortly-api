import joi from "joi";

import { urlsRepository } from "../repositories/urlsRepository.js";

export function validateUrl(req,res,next){
  const { url } = req.body;
  const regex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  
  const schema = joi.object({
    url: joi.string().pattern(regex).required()
  });

  const { error, value } = schema.validate({ url }, { abortEarly: false });

  if(error){
    const e = error.details.map(er => er.message);
    return res.status(422).send(e);
  }

  res.locals.url = url;
  next();
};

export async function checkUrlExists(req,res,next){
  const { shortUrl } = req.params;

  try {
    const request = await urlsRepository.checkUrl(shortUrl);
    const linkInformation = request.rows[0];

    if(!linkInformation){
      return res.sendStatus(404);
    }

    res.locals.linkInformation = linkInformation;
    next();
  } catch (e) {
    console.log(chalk.bold.red('Erro no servidor'), e);
    return res.sendStatus(500);
  }
}