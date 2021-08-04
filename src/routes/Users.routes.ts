import { Response, Request, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateUserSerice from '../service/CreateUserSerice';
import UsersRepository from '../repositories/UsersRepository';

const usersRouter = Router();

usersRouter.get('/', async (request: Request, response: Response) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const users = await usersRepository.find();
  response.json(users);
});

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const createUser = new CreateUserSerice();
    const user = await createUser.execute({
      ...request.body,
    });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
