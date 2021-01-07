import { prop, getModelForClass } from '@typegoose/typegoose';
class Shop {
  @prop({ required: true })
  name!: string;
}

export const ShopModel = getModelForClass(Shop);
