import { Request } from 'express';

export const omit = (obj: any, ...keys: string[]) => {
  const newObj = { ...obj };

  keys.forEach((key) => {
    delete newObj[key];
  });

  return newObj;
};

export const getAuthorizationTokens = (req: Request) => {
  const accessToken = req.headers.authorization;
  const refreshToken = Array.isArray(req.headers['x-refresh-token'])
    ? req.headers['x-refresh-token'][0]
    : req.headers['x-refresh-token'];
  const userId = Array.isArray(req.headers['x-user-id'])
    ? req.headers['x-user-id'][0]
    : req.headers['x-user-id'];

  if (!accessToken || !refreshToken) {
    throw new Error('Missing access token or refresh token');
  }

  return { accessToken, refreshToken, userId };
};
