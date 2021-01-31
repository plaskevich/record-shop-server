import { UserModel } from '../../models/User';
import { ShopModel } from '../../models/Shop';

export async function addShop(_: any, { name }: { name: string }, { currentUser }: any) {
  const newShop = new ShopModel({ name });
  const shop = await newShop.save();
  const user = await UserModel.findById(currentUser.id)
  if (user && shop._id) {
    user.shop = shop._id
    user.role = 'admin'
    user.save()
    return shop
  } else throw new Error("Something went wrong")
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