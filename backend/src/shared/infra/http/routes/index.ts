import { Router } from 'express';
import UserRouter from '../../../../modules/user/infra/http/routes/user.routes';

const appRouter = Router();

appRouter.use('/users', UserRouter);

export default appRouter;
