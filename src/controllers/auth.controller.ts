import { Request, Response } from 'express';

import { CreateUserInput } from '@/schema/user.schema';
import { createUser } from '@/service/user.service';
import { getAuthorizationTokens } from '@/utils/helpers';
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
    return res.send(user);
  } catch (e: any) {
    return res.status(500).send({ message: e.message || 'Unknown error' });
  }
};
