import { Document, model, Schema } from 'mongoose';
import { hashSync, compare } from 'bcrypt';

export interface UserInput {
  email: string;
  password: string;
}

export interface UserDocument extends UserInput, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  const user = this as UserDocument;

  try {
    return await compare(candidatePassword, user.password);
  } catch (error: any) {
    return false;
  }
};

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;
