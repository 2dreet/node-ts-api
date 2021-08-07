import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

export default {
  // Responsavel por alterar o nome do arquivo e o local para onde ele ira ser armazenado
  storage: multer.diskStorage({
    // aqui colocar a pasta aonde os arquivos irao ser salvos
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename(request, file, callback) {
      // aqui gera um hash aleatorio para nao ter problema de arquivos com o mesmo nome
      const fileHash = crypto.randomBytes(10).toString('hex');
      // Aqui concatena os nomes
      const fileName = `${fileHash}-${file.originalname}`;
      // aqui retorna para aplicacao o arquivo formatado
      callback(null, fileName);
    },
  }),
};
