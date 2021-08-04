import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

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

  @UpdateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Appointment;
