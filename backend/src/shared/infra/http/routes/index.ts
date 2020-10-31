import { Router } from 'express';
import LoginRouter from '@modules/user/infra/http/routes/login.routes';
import UserRouter from '../../../../modules/user/infra/http/routes/user.routes';

const appRouter = Router();

appRouter.use('/users', UserRouter);
appRouter.use('/login', LoginRouter);

export default appRouter;
