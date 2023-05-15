import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import * as argon2 from 'argon2';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', async function (next) {
            if (!this.isModified('password')) {
              return next();
            }

            const hashedPassword = await argon2.hash(this.password);
            this.password = hashedPassword;
          });
          return schema;
        },
      },
    ]),
  ],
})
export class UserModule {}
