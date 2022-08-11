import { Request, Response, NextFunction } from 'express';

import { verifyJwt } from '@/utils/jwt';
import { reIssueAccessToken } from '@/service/session.service';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = (req.headers.authorization || '').replace(
    /^Bearer\s/,
    '',
  );

  if (!accessToken) {
    return next();
  }

  const refreshToken = req.headers['x-refresh-token'];

  const { decoded, expired } = verifyJwt(
    accessToken,
    'ACCESS_TOKEN_PUBLIC_KEY',
  );

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({
      refreshToken: Array.isArray(refreshToken)
        ? refreshToken[0]
        : refreshToken,
    });

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
    }

    const result = verifyJwt(
      newAccessToken as string,
      'ACCESS_TOKEN_PUBLIC_KEY',
    );

    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
