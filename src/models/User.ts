import { Document, model, Schema } from 'mongoose';

/**
 * User interface
 * @param email:string
 * @param password:string
 * @param createdAt:Date
 * @param updatedAt:Date
 */
export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
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

const User = model<IUser>('User', userSchema);

export default User;
