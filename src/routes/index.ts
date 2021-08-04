import { Router, Request, Response } from 'express';

import appointmentRouter from './Appointments.routes';
import usersRouter from './Users.routes';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  response.json({ message: 'OK' });
});

routes.use('/user', usersRouter);

routes.use('/appointment', appointmentRouter);

export default routes;
