import { UserModel } from '../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function signUp(_: any, { data }: any) {
    const hashPass = await bcrypt.hash(data.password, 12);
    const newUser = new UserModel({
      email: data.email,
      password: hashPass,
      name: data.name,
    });
    await newUser.save();
    const token = jwt.sign({ userId: newUser.id }, 'secret');
    return { token, user: newUser };
  }
  
  export async function signIn(_: any, { data }: any) {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) throw new Error('User was not found');
    const compare = await bcrypt.compare(data.password, user.password);
    if (!compare) throw new Error('Incorrect credentials');
    const token = jwt.sign({ userId: user.id }, 'secret');
    return { token, user };
  }