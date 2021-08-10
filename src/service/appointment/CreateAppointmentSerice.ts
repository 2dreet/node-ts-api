import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import AppError from '../../errors/AppError';
import Appointment from '../../models/Appointment';
import AppointmentRepository from '../../repositories/AppointmentRepository';

interface Request {
  date: Date;
  providerId: string;
}

class CreateAppointmentSerice {
  public async execute({ date, providerId }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await appointmentRepository.create({
      providerId,
      date: appointmentDate,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentSerice;
