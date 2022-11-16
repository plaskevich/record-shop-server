import { prop, getModelForClass } from '@typegoose/typegoose';

class User {
  @prop()
  id!: string;
  @prop({ required: true })
  email!: string;
  @prop({ required: true })
  password!: string;
  @prop()
  shopName!: string;
}

export const UserModel = getModelForClass(User);
