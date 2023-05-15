import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './profile.schema';
@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
  ) {}

  async findRole(id: string) {
    return await this.profileModel.findById(id);
  }
}
