import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';

// Um para Um (OneToOne)
// Um para Muitos (OneToMany)
// Muitos para Muitos (ManyToMany)

// @Entity define qual tabela é
@Entity('appointments')
class Appointment {
  // Define o id
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'provider_id' })
  providerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  // define tipagem da coluna
  @Column('timestamp with time zone')
  date: Date;

  @UpdateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Appointment;
