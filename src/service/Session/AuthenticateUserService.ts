import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../../models/User';

interface RequestAuthenticateUser {
  email: string;
  password: string;
}

interface ResponseAuthenticateUser {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: RequestAuthenticateUser): Promise<ResponseAuthenticateUser> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user || !user.password) {
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    const secret = 'dfe921587414fbcd08f774ae1067f59a';

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
