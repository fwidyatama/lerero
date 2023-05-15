import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileService } from './profile.service';
import { Profile, ProfileSchema } from './profile.schema';

@Module({
  controllers: [],
  providers: [ProfileService],
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
