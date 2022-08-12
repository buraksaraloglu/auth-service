import { z } from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          description: jane.doe@example.com
 *        password:
 *          type: string
 *          description: stringPassword123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        email:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
export const createUserSchema = z.object({
  body: z.object({
    email: z
      .string({
        description: 'Email of the user',
        required_error: 'Email is required',
      })
      .trim()
      .email({ message: 'Invalid email address' }),
    password: z
      .string({
        description: 'Password must be at least 8 characters long',
        required_error: 'Password is required',
      })
      .trim()
      .min(8, {
        message: 'Password must be at least 8 characters',
      }),
  }),
});

export const getUserSchema = z.object({
  headers: z.object({
    authorization: z
      .string({
        description: 'Authorization token',
      })
      .trim()
      .startsWith('Bearer ', { message: 'Invalid authorization token' }),
    'x-refresh': z
      .string({
        description: 'Refresh token',
      })
      .trim(),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type GetUserInput = z.infer<typeof getUserSchema>;
