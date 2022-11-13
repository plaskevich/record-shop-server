import { prop, getModelForClass } from '@typegoose/typegoose';

class Record {
  @prop({ required: true })
  artist!: string[];
  @prop({ required: true })
  title!: string;
  @prop({ required: true })
  status!: string;
  @prop({ required: true })
  label!: string[];
  @prop()
  condition!: string;
  @prop()
  genre!: string[];
  @prop()
  date_added!: string;
  @prop()
  price!: number;
  @prop()
  year!: number;
  @prop()
  notes!: string;
  @prop()
  img_uri!: string;
  @prop({ required: true })
  shop!: string;
}

export const RecordModel = getModelForClass(Record);
