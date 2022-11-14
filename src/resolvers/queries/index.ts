import { RecordModel } from '../../models/Record';
import { ShopModel } from '../../models/Shop';
import { UserModel } from '../../models/User';
import { checkUserShop } from './utils';
import { GraphQLYogaError } from '@graphql-yoga/node';

export async function getRecord(
  _: any,
  { id }: { id: string },
  { currentUser }: any
) {
  if (!currentUser) throw new GraphQLYogaError('Invalid user');
  const record = await RecordModel.findById(id);
  if (!record) throw new GraphQLYogaError('Record not found');
  // if (record.shop != currentUser.shop)
  //   throw new GraphQLYogaError('No permission for selected record');
  return record;
}
export async function getCollection(
  _: any,
  { filter }: { filter: string },
  { currentUser }: any
) {
  if (!currentUser) throw new GraphQLYogaError('Invalid user');
  switch (filter) {
    case 'all': {
      return await RecordModel.find({ shop: currentUser.shop });
    }
    case 'inStock': {
      return await RecordModel.find({
        status: 'inStock',
        shop: currentUser.shop,
      });
    }
    case 'sold': {
      return await RecordModel.find({
        status: 'sold',
        shop: currentUser.shop,
      });
    }
    default:
      throw new GraphQLYogaError('Incorrect filter parameter');
  }
}
export async function getStockRecords(_: any, data: any, { currentUser }: any) {
  if (!currentUser) throw new GraphQLYogaError('Invalid user');
  const records = await RecordModel.find({
    status: 'inStock',
    shop: currentUser.shop,
  });
  if (!records) return new GraphQLYogaError('Records not found');
  return records;
}
export async function getSoldRecords(_: any, data: any, { currentUser }: any) {
  if (!currentUser) throw new GraphQLYogaError('Invalid user');
  const records = await RecordModel.find({
    status: 'sold',
    shop: currentUser.shop,
  });
  if (!records) return new GraphQLYogaError('Records not found');
  return records;
}

export async function getShopUsers(_: any, data: any, { currentUser }: any) {
  const users = await UserModel.find({ shop: currentUser.shop });
  users.forEach((e: any) => {
    e.id = e._id;
  });
  return users;
}

export async function getGenreStatistics(
  _: any,
  data: any,
  { currentUser }: any
) {
  if (!currentUser) throw new GraphQLYogaError('Invalid user');
  const records = await RecordModel.find({ shop: currentUser.shop });
  const result: { genre: string; records: string[]; percent: number }[] = [];
  const genreObject = records.reduce(function (r: any, a: any) {
    r[a.genre] = r[a.genre] || [];
    r[a.genre].push(a.id);
    return r;
  }, Object.create(null));

  Object.keys(genreObject).forEach((e: any) => {
    const percent = 100 / (records.length / genreObject[e].length);
    result.push({ genre: e, records: genreObject[e], percent });
  });
  return result;
}
