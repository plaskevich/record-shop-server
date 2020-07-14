import { prop, getModelForClass } from '@typegoose/typegoose';

class User {
  @prop({ required: true })
  email!: string;
  @prop({ required: true })
  password!: string;
  @prop()
  name!: string;
  @prop()
  shop!: string;
}

export const UserModel = getModelForClass(User);
