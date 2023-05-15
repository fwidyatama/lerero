import { HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED_ACCESS } from 'src/constant/response.constant';

export function BasicTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [username, password] = Buffer.from(b64auth, 'base64')
    .toString()
    .split(':');
  if (
    username === process.env.BASIC_AUTH_USERNAME &&
    password === process.env.BASIC_AUTH_PASSWORD
  ) {
    next();
  } else {
    res.status(HttpStatus.UNAUTHORIZED).json({
      message: UNAUTHORIZED_ACCESS,
    });
  }
}
