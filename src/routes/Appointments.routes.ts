import { Response, Request, Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import CreateAppointmentSerice from '../service/appointment/CreateAppointmentSerice';
import AppointmentRepository from '../repositories/AppointmentRepository';

const appointmentRouter = Router();

appointmentRouter.get('/', async (request: Request, response: Response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();
  response.json(appointments);
});

appointmentRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { providerId, date } = request.body;
    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentSerice();

    const appointment = await createAppointment.execute({
      providerId,
      date: parseDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentRouter;
