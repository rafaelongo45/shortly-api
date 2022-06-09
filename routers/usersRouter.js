import { Router } from "express";

import { userExists } from "../middlewares/validateUser.js";
import { validateTokenUserRoute } from "../middlewares/validateToken.js";
import { getRanking, getUserData } from "../controllers/usersController.js";

const userRouter = Router();

userRouter.get('/ranking', getRanking);
userRouter.get('/users/:id', userExists, validateTokenUserRoute, getUserData);

export default userRouter;