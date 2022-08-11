import { Request, Response } from 'express';

import {
  createSession,
  findSessions,
  updateSession,
} from '../service/session.service';
import { validatePassword } from '../service/user.service';
import { signJwt } from '@/utils/jwt';

export async function createUserSessionController(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send('Invalid email or password');
  }

  // create a session
  const session = await createSession(user._id, req.get('user-agent') || '');

  // create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    'ACCESS_TOKEN_PRIVATE_KEY',
    { expiresIn: '1h' },
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    'REFRESH_TOKEN_PRIVATE_KEY',
    { expiresIn: '1h' },
  );

  // return access & refresh tokens
  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsController(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteSessionController(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
