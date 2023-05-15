import { Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import * as argon2 from 'argon2';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { Payload } from './auth.payload';
import { ProfileService } from '../profile/profile.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private jwtService: JwtService,
  ) {}

  async validateLogin(loginDTO: LoginDTO) {
    const user = await this.userService.findByUserName(loginDTO.username);

    if (user) {
      const payload = this.generatePayload(user);

      const token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      });

      const isValid = await argon2.verify(user.password, loginDTO.password);

      if (isValid) {
        await this.userService.updateToken(user.username, token);
        const profile = await this.profileService.findRole(user.profile._id);
        return { token, profile: profile.name };
      }
    }
    return null;
  }

  async logout(username: string) {
    const result = await this.userService.updateToken(username, '');
    return result.modifiedCount > 0 ? true : false;
  }

  generatePayload(user: User): Payload {
    return { username: user.username, profile: user.profile.name };
  }
}
