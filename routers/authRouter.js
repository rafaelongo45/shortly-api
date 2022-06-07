import { Router } from "express";

import { signin, signup } from "../controllers/authController.js";
import { validateCredentials, validateCredentialsFormat } from "../middlewares/signinDataValidate.js";
import { encryptPassword, isRegistered, validateUserData } from "../middlewares/signupDataValidate.js";

const authRouter = Router();

authRouter.post('/signin', validateCredentialsFormat, validateCredentials, signin);
authRouter.post('/signup', validateUserData, isRegistered, encryptPassword, signup);

export default authRouter;