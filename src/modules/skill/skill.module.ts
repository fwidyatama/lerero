import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from './skill.schema';
import { SkillService } from './skill.service';
import { ActivityModule } from '../activity/activity.module';
import { SkillController } from './skill.controller';

@Module({
  controllers: [SkillController],
  providers: [SkillService],
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
    ActivityModule,
  ],
  exports: [SkillService],
})
export class SkillModule {}
