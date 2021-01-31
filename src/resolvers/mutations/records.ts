import { RecordModel } from '../../models/Record';
import { mongoose } from '@typegoose/typegoose';

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
  const record = await RecordModel.findById(id)
  if (!record) throw new Error('Record does not exist')
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
    .then((res: any) => {
      return res;
    });
}