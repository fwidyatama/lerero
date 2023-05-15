import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { SkillModule } from './modules/skill/skill.module';
import { ProfileModule } from './modules/profile/profile.module';
import { AuthModule } from './modules/auth/auth.module';
import { ActivityModule } from './modules/activity/activity.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      autoIndex: true,
    }),
    UserModule,
    AuthModule,
    SkillModule,
    ProfileModule,
    ActivityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
