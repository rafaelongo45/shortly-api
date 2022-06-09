import { Router } from "express";

import { userExists } from "../middlewares/validateUser.js";
import { validateToken } from "../middlewares/validateToken.js";
import { getRanking, getUserData } from "../controllers/usersController.js";

const userRouter = Router();

userRouter.get('/ranking', getRanking);
userRouter.get('/users/:id', userExists, validateToken, getUserData);

export default userRouter;