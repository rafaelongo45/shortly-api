import { Router } from "express";

import { isIdValid } from "../middlewares/validateId.js";
import { validateUrl } from "../middlewares/validateUrl.js";
import { validateToken } from "../middlewares/validateToken.js";
import { insertUrl, sendSelectedUrl } from "../controllers/urlsController.js";

const urlsRouter = Router();

urlsRouter.get('/urls/:id', isIdValid, sendSelectedUrl);
urlsRouter.post('/urls/shorten', validateToken, validateUrl, insertUrl);

export default urlsRouter;