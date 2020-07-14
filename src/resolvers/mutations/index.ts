import { RecordModel } from '../../models/Record';
import { UserModel } from '../../models/User';
import { ShopModel } from '../../models/Shop';
import { mongoose } from '@typegoose/typegoose';
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

export async function addShop(_: any, { name }: { name: string }) {
  const newShop = new ShopModel({ name });
  await newShop.save();
  return newShop;
}

export async function addRecord(_: any, { data }: any, { currentUser }: any) {
  if (!currentUser) throw new Error('Invalid user');
  const newRecord = new RecordModel({
    ...data,
    date_added: new Date(),
    shop: currentUser.shop,
  });
  await newRecord.save();
  return newRecord;
}

export async function editRecord(_: any, { id, data }: any) {
  await RecordModel.updateOne({ _id: mongoose.Types.ObjectId(id) }, data);
  return await RecordModel.findById(id);
}

export async function setInStock(_: any, { id }: { id: string }) {
  await RecordModel.updateOne(
    { _id: mongoose.Types.ObjectId(id) },
    { status: 'inStock' },
  );
  return await RecordModel.findById(id);
}

export async function setSold(_: any, { id }: { id: string }) {
  await RecordModel.updateOne(
    { _id: mongoose.Types.ObjectId(id) },
    { status: 'sold' },
  );
  return await RecordModel.findById(id);
}

export async function removeRecord(_: any, { id }: { id: string }) {
  return RecordModel.findByIdAndDelete(id)
    .exec()
    .then((res) => {
      return res;
    });
}
