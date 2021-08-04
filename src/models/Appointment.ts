import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity define qual tabela é
@Entity('appointments')
class Appointment {
  // Define o id
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // define tipagem da coluna
  @Column('varchar')
  provider: string;

  // define tipagem da coluna
  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;
