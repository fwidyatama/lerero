import { Injectable } from '@nestjs/common';
import { ActivityService } from '../activity/activity.service';

@Injectable()
export class SkillService {
  constructor(private activityService: ActivityService) {}

  async findAll() {
    const skill = await this.activityService.findSkillWithActiveActivity();
    return skill;
  }
}
