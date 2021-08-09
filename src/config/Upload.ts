import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const director = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  // Colocado para facilitar na obtencao do local padrao
  director,
  // Responsavel por alterar o nome do arquivo e o local para onde ele ira ser armazenado
  storage: multer.diskStorage({
    // aqui colocar a pasta aonde os arquivos irao ser salvos
    destination: director,
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
