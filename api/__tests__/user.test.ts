import mongoose from 'mongoose';
import supertest from 'supertest';
import { createServer } from '@/utils/server';
import * as UserService from '@/service/user.service';
import * as SessionService from '@/service/session.service';
import { createUserSessionController } from '@/controllers/session.controller';

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  email: 'jane.doe@example.com',
};

const userInput = {
  email: 'test@example.com',
  password: 'Password123',
};

const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userId,
  valid: true,
  userAgent: 'PostmanRuntime/7.28.4',
  createdAt: new Date('2021-09-30T13:31:07.674Z'),
  updatedAt: new Date('2021-09-30T13:31:07.674Z'),
  __v: 0,
};

describe('user', () => {
  describe('user registration', () => {
    describe('given the username and password are valid', () => {
      it('should return the user payload', async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, 'createUser')
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .post('/api/v1/auth/users')
          .send(userInput);

        expect(statusCode).toBe(200);

        expect(body).toEqual(userPayload);

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });

      it('should return 400 if user exists', async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, 'createUser')
          // @ts-ignore
          .mockRejectedValueOnce(new Error('User already exists'));

        const { statusCode, body } = await supertest(app)
          .post('/api/v1/auth/users')
          .send(userInput);

        expect(statusCode).toBe(400);

        expect(body).toEqual({
          message: 'User already exists',
        });

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });

      it('should return 400 if email is invalid', async () => {
        const invalidRequest = {
          ...userInput,
          email: 'invalid email',
        };

        const { statusCode, body } = await supertest(app)
          .post('/api/v1/auth/users')
          .send(invalidRequest);

        expect(statusCode).toBe(400);

        const errors = body;
        expect(errors).toHaveLength(1);

        expect(errors[0].message).toEqual('Invalid email address');
      });

      it('should return 400 if password is invalid', async () => {
        const invalidRequest = {
          ...userInput,
          password: '123',
        };
        const { statusCode, body } = await supertest(app)
          .post('/api/v1/auth/users')
          .send(invalidRequest);

        expect(statusCode).toBe(400);

        const errors = body;
        expect(errors).toHaveLength(1);

        expect(errors[0].message).toEqual(
          'Password must be at least 8 characters',
        );
      });
    });

    describe('given the user service throws', () => {
      it('should return a 400 error', async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, 'createUser')
          .mockRejectedValueOnce('Oh no! :(');

        const { statusCode } = await supertest(createServer())
          .post('/api/v1/auth/users')
          .send(userInput);

        expect(statusCode).toBe(400);

        expect(createUserServiceMock).toHaveBeenCalled();
      });
    });
  });

  describe('create user session', () => {
    describe('given the username and password are valid', () => {
      it('should return a signed accessToken & refresh token', async () => {
        jest
          .spyOn(UserService, 'validatePassword')
          // @ts-ignore
          .mockReturnValue(userPayload);

        jest
          .spyOn(SessionService, 'createSession')
          // @ts-ignore
          .mockReturnValue(sessionPayload);

        const req = {
          get: () => {
            return 'a user agent';
          },
          body: {
            email: 'test@example.com',
            password: 'Password123',
          },
        };

        const send = jest.fn();

        const res = {
          send,
        };

        // @ts-ignore
        await createUserSessionController(req, res);

        expect(send).toHaveBeenCalledWith({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        });
      });
    });
  });
});
