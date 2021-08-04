import { EntityRepository, Repository } from 'typeorm';
import Users from '../models/Users';

// Define qual model é
@EntityRepository(Users)
// Configura o Repository com a model
class UsersRepository extends Repository<Users> {
  public async findByEmail(email: string): Promise<Users | null> {
    // Monta query de select
    const findUsers = await this.findOne({
      where: { email },
    });
    return findUsers || null;
  }
}
export default UsersRepository;
