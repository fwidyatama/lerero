import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Transform } from 'class-transformer';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  name: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
