import { RecordModel } from '../../models/Record';
import { UserModel } from '../../models/User';
import { GraphQLYogaError } from '@graphql-yoga/node';

export async function getRecord(
  _: any,
  { id }: { id: string },
  { currentUser }: any
) {
  if (!currentUser) throw new GraphQLYogaError('Invalid user');
  const record = await RecordModel.findById(id);
  if (!record) throw new GraphQLYogaError('Record not found');
  if (record.user != currentUser.id)
    throw new Error('No permission for selected record');
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
      return await RecordModel.find({ user: currentUser.id });
    }
    case 'inStock': {
      return await RecordModel.find({
        status: 'inStock',
        user: currentUser.id,
      });
    }
    case 'sold': {
      return await RecordModel.find({
        status: 'sold',
        user: currentUser.id,
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
    user: currentUser.id,
  });
  if (!records) return new GraphQLYogaError('Records not found');
  return records;
}
export async function getSoldRecords(_: any, data: any, { currentUser }: any) {
  if (!currentUser) throw new GraphQLYogaError('Invalid user');
  const records = await RecordModel.find({
    status: 'sold',
    user: currentUser.id,
  });
  if (!records) return new GraphQLYogaError('Records not found');
  return records;
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
