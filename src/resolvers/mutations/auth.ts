import { UserModel } from '../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { GraphQLYogaError } from '@graphql-yoga/node';

export async function signUp(
  _: any,
  { email, password }: { email: string; password: string }
) {
  if (!email) throw new Error('Email missing');
  if (!password) throw new Error('Password missing');
  const hashPass = await bcrypt.hash(password, 12);
  const newUser = new UserModel({
    email: email,
    password: hashPass,
  });
  await newUser.save();
  newUser.id = newUser._id;
  const token = jwt.sign({ userId: newUser.id }, 'secret');
  return { token, user: newUser };
}

export async function signIn(
  _: any,
  { email, password }: { email: string; password: string }
) {
  if (!email) throw new Error('Email missing');
  if (!password) throw new Error('Password missing');
  const user = await UserModel.findOne({ email: email });
  if (!user) throw new Error('Incorrect credentials');
  user.id = user._id;
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) throw new GraphQLYogaError('Incorrect credentials');
  const token = jwt.sign({ userId: user.id }, 'secret');
  return { token, user };
}
