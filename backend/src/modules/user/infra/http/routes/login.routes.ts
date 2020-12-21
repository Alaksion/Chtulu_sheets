import { Router } from 'express';
import UserLoginController from '@modules/user/infra/http/controllers/UserLoginController';
import { celebrate, Joi, Segments } from 'celebrate';

const LoginRouter = Router();
const userLoginController = new UserLoginController();

LoginRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  userLoginController.Login,
);

export default LoginRouter;
