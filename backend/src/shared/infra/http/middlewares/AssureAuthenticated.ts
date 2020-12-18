import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AuthConfig from '@config/AuthConfig';
import UnauthorizedError from '@shared/Errors/UnauthorizedError';

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
    throw new UnauthorizedError(
      'Auth token must be provided to access this resource',
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
    throw new UnauthorizedError('Invalid JWT TOKEN');
  }
}
