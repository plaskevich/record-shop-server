import { UserModel } from '../../models/User';
import { ShopModel } from '../../models/Shop';

export async function addShop(_: any, { name }: { name: string }) {
  const newShop = new ShopModel({ name });
  await newShop.save();
  return newShop;
}

export async function addUserToShop(_: any, { email, role }: { email: string, role: string }, { currentUser }: any) {
  if (currentUser.role === 'admin') {
    const user = await UserModel.findOne({ email })
    if (user) {
      user.shop = currentUser.shop
      user.role = role
      user.save()
      return true
    }
  } else {
    throw new Error("You don't have permisson for this operation")
  }
}

export async function changeUserRole(_: any, { userId, role }: { userId: string, role: string }, { currentUser }: any) {
  if (currentUser.role === 'admin') {
    const user = await UserModel.findById(userId)
    if (user && user.shop === currentUser.shop) {
      user.role = role
      user.save()
      return true
    } else {
      throw new Error("User does not belong to your shop")
    }
  } else {
    throw new Error("You don't have permisson for this operation")
  }
}

export async function removeUser(_: any, { userId }: { userId: string }, { currentUser }: any) {
  if (currentUser.role === 'admin') {
    const user = await UserModel.findById(userId)
    if (user && user.shop === currentUser.shop) {
      user.shop = ''
      user.role = ''
      user.save()
      return true
    } else {
      throw new Error("User does not belong to your shop")
    }
  } else {
    throw new Error("You don't have permisson for this operation")
  }
}