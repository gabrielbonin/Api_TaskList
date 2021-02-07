import JWT from 'jsonwebtoken';
import { promisify } from 'util'; // transforma uma funcao callback em await/async
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não existe' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(JWT.verify)(token, authConfig.secret);
    req.userId = decoded.id; // recebe o id do user logado
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalido' });
  }
};
