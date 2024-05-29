import { Router } from 'express';
import { login, register } from '../controllers/authController.js';
import { validateResgisterInput } from '../middleware/validationMiddleware.js';
const authRouter = Router();

authRouter.post('/register', validateResgisterInput, register);
authRouter.post('/login', login);

export default authRouter;
