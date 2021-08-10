import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import auth from '../config/Auth';

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
    throw new AppError('JWT Authorization is missing', 401);
  }

  try {
    const [_, token] = authHeader.split(' ');
    const { secret } = auth.jwt;
    const tokenDecoded = verify(token, secret);
    const { sub } = tokenDecoded as TokenPayload;
    request.user = { id: sub };

    console.log(request.user);

    return next();
  } catch {
    throw new AppError('JWT Token invalid or expired', 401);
  }
}
export default ensureAuthenticated;
