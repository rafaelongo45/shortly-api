import { Router } from "express";

import { signup } from "../controllers/authController.js";
import { encryptPassword, isRegistered, validateUserData } from "../middlewares/signupDataValidate.js";

const authRouter = Router();

authRouter.post('/signup', validateUserData, isRegistered, encryptPassword, signup)

export default authRouter;