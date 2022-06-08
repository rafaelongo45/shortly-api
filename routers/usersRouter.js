import { Router } from "express";

import { userExists } from "../middlewares/validateUser.js";
import { getUserData } from "../controllers/usersController.js";

const userRouter = Router();

userRouter.get('/users/:id', userExists, getUserData);

export default userRouter;