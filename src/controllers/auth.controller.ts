import { Request, Response } from 'express';

import { CreateUserInput } from '@/schema/user.schema';
import { createUser } from '@/service/user.service';
import { getAuthorizationTokens, omit } from '@/utils/helpers';
import { findSessions } from '@/service/session.service';

export const createUserController = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response,
) => {
  try {
    const user = await createUser({
      email: req.body.email,
      password: req.body.password,
    });

    return res.send(user);
  } catch (e: any) {
    return res.status(400).send({ message: e.message });
  }
};

export const getUserController = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    if (!user) {
      if (res.locals.userExpired)
        return res.status(400).send({ message: 'jwt token is expired' });

      return res.status(400).send({ message: 'jwt token is invalid' });
    }

    return res.send(omit(user, 'password'));
  } catch (e: any) {
    return res.status(401).send({ message: 'Token expired' });
  }
};
