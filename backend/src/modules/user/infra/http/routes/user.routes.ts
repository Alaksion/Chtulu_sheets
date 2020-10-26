import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import UserController from '../controllers/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(10),
    },
  }),
  userController.create,
);

export default userRouter;
