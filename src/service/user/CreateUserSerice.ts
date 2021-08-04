import { getCustomRepository } from 'typeorm';

import Users from '../../models/Users';
import UsersRepository from '../../repositories/UsersRepository';

interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserSerice {
  public async execute(userCreateRequest: UserCreateRequest): Promise<Users> {
    const usersRepository = getCustomRepository(UsersRepository);

    const findUsersInSameEmail = await usersRepository.findByEmail(
      userCreateRequest.email,
    );

    if (findUsersInSameEmail) {
      throw new Error('This Email is already used');
    }

    const user = await usersRepository.create({
      ...userCreateRequest,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserSerice;
