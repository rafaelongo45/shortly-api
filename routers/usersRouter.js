import { Router } from "express";

import { userExists } from "../middlewares/validateUser.js";
import { getRanking, getUserData } from "../controllers/usersController.js";

const userRouter = Router();

userRouter.get('/users/ranking', getRanking);
userRouter.get('/users/:id', userExists, getUserData);

export default userRouter;