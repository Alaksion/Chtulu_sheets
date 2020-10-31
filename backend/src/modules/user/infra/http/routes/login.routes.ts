import { Router } from 'express';
import UserLoginController from '@modules/user/infra/http/controllers/UserLoginController';

const LoginRouter = Router();
const userLoginController = new UserLoginController();

LoginRouter.post('/', userLoginController.Login);

export default LoginRouter;
