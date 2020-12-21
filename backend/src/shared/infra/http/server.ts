import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import '../typeorm/index';
import '@shared/container/index';
import { isCelebrateError, errors } from 'celebrate';
import cors from 'cors';
import AppError from '@shared/Errors/AppError';
import UploadConfig from '@config/UploadConfig';
import appRoutes from './routes/index';

const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());
app.use('/files', express.static(UploadConfig.directory));
app.use(appRoutes);
// app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      timestamp: err.timestamp,
      status: err.statusCode,
      error: err.name,
      message: err.message,
    });
  }

  if (isCelebrateError(err)) {
    return res.status(400).json({
      timestamp: new Date(Date.now()),
      status: 400,
      error: 'Bad Request',
      message: 'Field validation error',
    });
  }

  console.log(err);
  return res.status(500).json({
    timestamp: new Date(Date.now()),
    status: 'Error',
    error: 'Interver Server Error',
    message: 'Internal Server error',
  });
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
