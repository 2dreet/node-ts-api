import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import Auth from '../config/Auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new Error('JWT Authorization is missing');
  }
  const [bearer, token] = authHeader.split(' ');
  try {
    const { secret } = Auth.jwt;
    const tokenDecoded = verify(token, secret);
    const { sub } = tokenDecoded as TokenPayload;
    request.user = { id: sub };

    console.log(request.user);

    return next();
  } catch {
    throw new Error('Ivalid JWT token');
  }
}
export default ensureAuthenticated;
