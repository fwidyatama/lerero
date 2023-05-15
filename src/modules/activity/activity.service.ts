import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity } from './activity.schema';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { QueryDTO } from './dto/query.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name) private readonly activityModel: Model<Activity>,
  ) {}

  async create(createDTO: CreateDTO) {
    const activity = (await this.activityModel.create(createDTO)).save();
    return activity;
  }

  async update(activityID: string, updateDTO: UpdateDTO) {
    const activity = await this.activityModel
      .findByIdAndUpdate(activityID, {
        $set: {
          ...updateDTO,
        },
      })
      .exec();
    return activity;
  }

  async findAll(skillID: string, queryDTO: QueryDTO) {
    const { limit, page, order } = queryDTO;
    const skippedItem = (page - 1) * limit;
    const orderType = order === 'ASC' ? 1 : -1;

    const activities = await this.activityModel
      .find({ skill: skillID })
      .skip(skippedItem)
      .populate('skill')
      .populate({
        path: 'participant',
        model: 'User',
        populate: [
          {
            path: 'profile',
            model: 'Profile',
          },
          {
            path: 'skill',
            model: 'Skill',
          },
        ],

        select: { _id: 1, name: 1, profile: 1, skill: 1 },
      })
      .sort({ startDate: orderType });

    return activities;
  }

  async delete(activityID: string) {
    const result = await this.activityModel.findByIdAndDelete(activityID);
    return result ? true : false;
  }

  async findSkillWithActiveActivity() {
    const activities = this.activityModel.aggregate([
      {
        $lookup: {
          from: 'skills',
          localField: 'skill',
          foreignField: '_id',
          as: 'skill',
        },
      },
      { $group: { _id: null, skill: { $addToSet: '$skill' } } },
      { $unwind: '$skill' },
      { $project: { _id: 0 } },
    ]);
    return activities;
  }
}
