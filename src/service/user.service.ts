import { FilterQuery } from 'mongoose';

import UserModel, { UserDocument, UserInput } from '@/models/User';
import { MONGO_ERROR_CODES } from '@/utils/mongoErrorCodes';
import { omit } from '@/utils/helpers';
import { hashPassword } from '@/utils/jwt';

export const createUser = async (input: UserInput) => {
  try {
    const newUser = {
      ...input,
      password: await hashPassword(input.password),
    };

    const user = await UserModel.create(newUser);

    return omit(user.toJSON(), 'password');
  } catch (e: any) {
    const errorCode = e.code as keyof typeof MONGO_ERROR_CODES;
    throw new Error(`${MONGO_ERROR_CODES[errorCode]}: ${e.message}`);
  }
};

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return user.toJSON();
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}
