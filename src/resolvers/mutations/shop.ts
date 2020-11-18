import { UserModel } from '../../models/User';
import { ShopModel } from '../../models/Shop';

export async function addShop(_: any, { name }: { name: string }) {
    const newShop = new ShopModel({ name });
    await newShop.save();
    return newShop;
  }
  
  export async function addUserToShop(_: any, { shopId, userId, role }: { shopId: string, userId: string, role: string }, { currentUser }: any) {
    const shop = await ShopModel.findById(shopId)
    if (shop?.users.some(item => item.userId === currentUser.id && item.role === 'admin')){
      if (shop?.users.some(item => item.userId === userId)) {
        throw new Error ('User already added')
      } else {
        const user = await UserModel.findById(userId)
        if (!user) throw new Error ('User you are trying to add does not exist')
        shop?.users.push({ userId, role})
        return await shop?.save()
      }
    } else {
      throw new Error ("You don't have permisson for this operation")
    }
  }
  
  export async function changeUserRole(_: any, { shopId, userId, role }: { shopId: string, userId: string, role: string }, { currentUser }: any) {
    const shop = await ShopModel.findById(shopId)
    if (shop?.users.some(item => item.userId === currentUser.id && item.role === 'admin')){
        return await shop.updateOne({'users.userId': userId}, {'$set': {
             'users.$.role': role
         }}, function(err) { console.log(err) })
    } else {
      throw new Error ("You don't have permisson for this operation")
    }
  }