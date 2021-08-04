import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// @Entity define qual tabela é
@Entity('users')
class User {
  // Define o id
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // define tipagem da coluna / default sem nada é varchar
  @Column('varchar')
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @UpdateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default User;
