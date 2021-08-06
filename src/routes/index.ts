import { Router, Request, Response } from 'express';

import appointmentRouter from './Appointments.routes';
import usersRouter from './Users.routes';
import sessionsRouter from './Sessions.routes';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  response.json({ message: 'OK' });
});

routes.use('/sessions', sessionsRouter);

routes.use('/user', usersRouter);

routes.use('/appointment', appointmentRouter);

export default routes;
