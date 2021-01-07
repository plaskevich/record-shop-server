import { prop, getModelForClass } from '@typegoose/typegoose';

class User {
  @prop()
  id!: string;
  @prop({ required: true })
  email!: string;
  @prop({ required: true })
  password!: string;
  @prop()
  name!: string;
  @prop()
  shop!: string;
  @prop()
  role!: string;
}

export const UserModel = getModelForClass(User);
