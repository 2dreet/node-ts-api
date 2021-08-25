import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';

import cors from 'cors';

import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/Upload';

import './database';
import AppError from './errors/AppError';

const app = express();
app.use(cors({}));

app.use(express.json());

app.use(routes);

app.use('/files', express.static(uploadConfig.director));

// Aqui criou a middleware global para tratar erro
app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.error(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
