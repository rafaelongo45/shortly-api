import { Router } from "express";

import { isIdValid } from "../middlewares/validateId.js";
import { validateToken } from "../middlewares/validateToken.js";
import { isUrlCreator } from "../middlewares/validateUrlCreator.js";
import { checkUrlExists, validateUrl } from "../middlewares/validateUrl.js";
import { deleteLink, insertUrl, sendSelectedUrl, updateCountRedirectLink } from "../controllers/urlsController.js";

const urlsRouter = Router();

urlsRouter.get('/urls/:id', isIdValid, sendSelectedUrl);
urlsRouter.get('/urls/open/:shortUrl', checkUrlExists, updateCountRedirectLink);

urlsRouter.post('/urls/shorten', validateToken, validateUrl, insertUrl);

urlsRouter.delete('/urls/:id', validateToken, isIdValid, isUrlCreator, deleteLink );

export default urlsRouter;