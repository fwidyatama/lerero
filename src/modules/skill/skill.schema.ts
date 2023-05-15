import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type SkillDocument = HydratedDocument<Skill>;

@Schema()
export class Skill {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  name: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
