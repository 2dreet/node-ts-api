import { getRepository } from 'typeorm';
import User from '../../models/User';

interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: UserCreateRequest): Promise<User> {
    const userRepository = getRepository(User);
    const userFinded = await userRepository.findOne({
      where: { email },
    });

    if (userFinded) {
      throw new Error('Emails already used');
    }

    const user = userRepository.create({
      name,
      email,
      password,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
