import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import { Skill } from '../skill/skill.schema';
import { Profile } from '../profile/profile.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop()
  token: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  })
  @Type(() => Profile)
  profile: Profile;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Skill', default: [] })
  skill: Skill[];
}

export const UserSchema = SchemaFactory.createForClass(User);
