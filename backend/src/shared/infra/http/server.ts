import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import '../typeorm/index';
import '@shared/container/index';
import { errors } from 'celebrate';
import AppError from '@shared/Errors/AppError';
import appRoutes from './routes/index';

const app = express();
const port = 8080;
app.use(express.json());
app.use(appRoutes);
app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);
  return res.status(500).json({
    status: 'Error',
    message: 'Internal Server error',
  });
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
