import { FilterQuery, UpdateQuery } from 'mongoose';

import SessionModel, { SessionDocument } from '../models/session';
import { verifyJwt, signJwt } from '../utils/jwt';
import { findUser } from './user.service';

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>,
) {
  return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken, 'REFRESH_TOKEN_PUBLIC_KEY');

  if (!decoded) return false;

  const decodedSession =
    typeof decoded === 'string' ? decoded : decoded.session;
  if (!decodedSession) return false;

  const session = await SessionModel.findById(decodedSession);

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    'ACCESS_TOKEN_PRIVATE_KEY',
    { expiresIn: '1h' },
  );

  return accessToken;
}
