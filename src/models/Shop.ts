import { prop, getModelForClass } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

class User {
  @prop()
  userId!: String;
  @prop()
  role!: String;
}


class Shop {
  @prop({ required: true })
  name!: string;
  @prop({ type: User})
  users!: User[];
}

export const ShopModel = getModelForClass(Shop);
