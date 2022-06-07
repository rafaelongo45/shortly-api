import { Router } from "express";

import { validateUrl } from "../middlewares/validateUrl.js";
import { insertUrl } from "../controllers/urlsController.js";
import { validateToken } from "../middlewares/validateToken.js";

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', validateToken, validateUrl, insertUrl);

export default urlsRouter;