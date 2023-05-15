import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDTO } from './dto/register.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(registerDTO: RegisterDTO): Promise<User> {
    const user = (await this.userModel.create(registerDTO)).save();
    return user;
  }

  async findByUserName(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).populate('profile');
    return user;
  }

  async updateToken(username: string, token: string) {
    const user = await this.userModel.updateOne(
      { username },
      { $set: { token } },
    );

    return user;
  }
}
