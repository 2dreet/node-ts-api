import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../../models/User';
import AppError from '../../errors/AppError';

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
      throw new AppError('Emails already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
