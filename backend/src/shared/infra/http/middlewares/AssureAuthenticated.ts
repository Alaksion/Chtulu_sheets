import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/Errors/AppError';
import AuthConfig from '@config/AuthConfig';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function AssureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError(
      'Auth token must be provided to access this resource',
      401,
    );
  }
  const [, token] = authHeader.split(' ');
  try {
    const decode = verify(token, AuthConfig.secret);
    const { sub } = decode as TokenPayLoad;
    req.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('Invalid JWT TOKEN', 401);
  }
}
