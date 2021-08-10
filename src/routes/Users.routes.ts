import { Response, Request, Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import User from '../models/User';
import CreateUserSerice from '../service/user/CreateUserSerice';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';
import uploadConfig from '../config/Upload';
import UpdateUserAvatarService from '../service/user/UpdateUserAvatarService';

// Aqui configura o uploadConfig com o multer
const upload = multer(uploadConfig);
const usersRouter = Router();

usersRouter.get('/', async (request: Request, response: Response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();

  return response.json(users);
});

usersRouter.post('/', async (request: Request, response: Response) => {
  const createUser = new CreateUserSerice();
  const user = await createUser.execute({
    ...request.body,
  });

  user.password = '';

  return response.json(user);
});

// Ao colocar a middleware depois da rota, ela executa apenas para a rota
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request: Request, response: Response) => {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      userId: request.user.id,
      avatarFileName: request.file?.filename,
    });

    return response.json(user);
  },
);

export default usersRouter;
