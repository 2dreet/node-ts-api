import { getRepository } from 'typeorm';
import parh from 'path';
import fs from 'fs';
import AppError from '../../errors/AppError';
import uploadConfig from '../../config/Upload';
import User from '../../models/User';

interface UploadUserAvatarRequest {
  userId: string;
  avatarFileName?: string;
}

class UpdateUserAvatarService {
  public async execute({
    userId,
    avatarFileName,
  }: UploadUserAvatarRequest): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new AppError('Only authenticated users can change avatar!', 401);
    }

    if (user.avatar) {
      // Aqui junta a url do repositorio padrao com o nome do arquivo
      const userAvatarFilePathOld = parh.join(
        uploadConfig.director,
        user.avatar,
      );

      // Aqui verifica se o arquivo existe
      const fileExist = await fs.promises.stat(userAvatarFilePathOld);
      if (fileExist) {
        // Aqui remove o arquivo
        await fs.promises.unlink(userAvatarFilePathOld);
      }
    }

    user.avatar = avatarFileName;
    await userRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
