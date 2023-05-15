import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';
import { Skill } from '../skill/skill.schema';
import { User } from '../user/user.schema';

export type ActivityDocument = HydratedDocument<Activity>;

@Schema()
export class Activity {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true,
  })
  @Type(() => Skill)
  skill: Skill;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  participant: User[];
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
