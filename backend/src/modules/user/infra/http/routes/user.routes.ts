import { Router } from 'express';
import multer from 'multer';
import { Segments, Joi, celebrate } from 'celebrate';
import AssureAuthenticated from '@shared/infra/http/middlewares/AssureAuthenticated';
import UploadConfig from '@config/UploadConfig';
import UserController from '../controllers/UserController';
import UserAvatarController from '../controllers/UserAvatarController';

const upload = multer(UploadConfig.multer);
const userRouter = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();

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

userRouter.patch(
  '/avatar',
  AssureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default userRouter;
