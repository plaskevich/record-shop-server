import { UserModel } from '../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function signUp(_: any, { email, password, name }: { email: string, password: string, name: string }) {
  const hashPass = await bcrypt.hash(password, 12);
  const newUser = new UserModel({
    email: email,
    password: hashPass,
    name: name,
  });
  await newUser.save();
  const token = jwt.sign({ userId: newUser.id }, 'secret');
  return { token, user: newUser };
}

export async function signIn(_: any, { email, password }: { email: string, password: string }) {
  const user = await UserModel.findOne({ email: email });
  if (!user) throw new Error('User was not found');
  user.id = user._id;
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) throw new Error('Incorrect credentials');
  const token = jwt.sign({ userId: user.id }, 'secret');
  return { token, user };
}