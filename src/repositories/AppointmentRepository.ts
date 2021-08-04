import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

// Define qual model é
@EntityRepository(Appointment)
// Configura o Repository com a model
class AppointmentRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    // Monta query de select
    const findAppointment = await this.findOne({
      where: { date },
    });
    return findAppointment || null;
  }
}
export default AppointmentRepository;
