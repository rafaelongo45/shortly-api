import joi from "joi";

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
}