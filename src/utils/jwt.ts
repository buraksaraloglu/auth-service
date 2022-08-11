import jwt from 'jsonwebtoken';
import { hashSync } from 'bcrypt';

import logger from './logger';

export const hashPassword = (password: string) => {
  return hashSync(password, 10);
};

export const signJwt = (
  object: Object,
  keyName: 'ACCESS_TOKEN_PRIVATE_KEY' | 'REFRESH_TOKEN_PRIVATE_KEY',
  options?: jwt.SignOptions | undefined,
) => {
  const signingKey = Buffer.from(process.env[keyName], 'base64').toString(
    'ascii',
  );

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = (
  token: string,
  keyName: 'ACCESS_TOKEN_PUBLIC_KEY' | 'REFRESH_TOKEN_PUBLIC_KEY',
) => {
  const publicKey = Buffer.from(process.env[keyName], 'base64').toString(
    'ascii',
  );

  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    logger.error(e);
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
};
