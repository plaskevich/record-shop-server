import { RecordModel } from '../../models/Record';
import { ShopModel } from '../../models/Shop';

export async function getRecord(
  _: any,
  { id }: { id: string },
  { currentUser }: any,
) {
  if (!currentUser) throw new Error('Invalid user');
  const record = await RecordModel.findById(id);
  if (!record) throw new Error('Record not found');
  if (record.shop != currentUser.shop)
    throw new Error('No permission for selected record');
  return record;
}
export async function getAllRecords(_: any, data: any, { currentUser }: any) {
  if (!currentUser) throw new Error('Invalid user');
  const records = await RecordModel.find({ shop: currentUser.shop });
  if (!records) return new Error('Records not found');
  return records;
}
export async function getStockRecords(_: any, data: any, { currentUser }: any) {
  if (!currentUser) throw new Error('Invalid user');
  const records = await RecordModel.find({
    status: 'inStock',
    shop: currentUser.shop,
  });
  if (!records) return new Error('Records not found');
  return records;
}
export async function getSoldRecords(_: any, data: any, { currentUser }: any) {
  if (!currentUser) throw new Error('Invalid user');
  const records = await RecordModel.find({
    status: 'sold',
    shop: currentUser.shop,
  });
  if (!records) return new Error('Records not found');
  return records;
}

export async function getShop(_: any, { id }: { id : string }) {
  const shop = await ShopModel.findById(id);
  return shop
}

export async function getGenreStatistics (_:any, data: any, {currentUser} : any) {
  if (!currentUser) throw new Error('Invalid user');
  const records = await RecordModel.find({ shop: currentUser.shop });
  const result: { genre: string; records: string[]; percent: number }[] = [];
  const genreObject = records.reduce(function (r, a) {
    r[a.genre] = r[a.genre] || [];
    r[a.genre].push(a.id);
    return r;
}, Object.create(null));

  Object.keys(genreObject).forEach(e => {
    const percent = 100/(records.length/genreObject[e].length)
    result.push({ genre: e, records: genreObject[e], percent})
  })
  return result
}