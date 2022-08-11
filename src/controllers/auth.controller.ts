import { Request, Response } from 'express';

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  res.send('Hello World!');
}
