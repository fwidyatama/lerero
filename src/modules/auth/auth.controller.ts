import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UnauthorizedException,
  UseFilters,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptorWithData } from 'src/interceptor/successReponseWithData.interceptor';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { UnauthorizedFilter } from 'src/filter/unauthorized.filter';
import { AuthGuard } from 'src/guard/auth.guard';
import {
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  UNAUTHORIZED_ACCESS,
} from 'src/constant/response.constant';

@Controller('auth')
@UseInterceptors(TransformInterceptorWithData)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  @UseFilters(new UnauthorizedFilter())
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.authService.validateLogin(loginDTO);
    if (user) {
      return { result: { ...user } };
    } else {
      throw new UnauthorizedException(LOGIN_FAILED);
    }
  }

  @Get('/logout')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UseFilters(new UnauthorizedFilter())
  async logout(@Request() req) {
    const { username } = req.user;
    const result = await this.authService.logout(username);
    if (result) {
      return { message: LOGOUT_SUCCESS };
    } else {
      throw new UnauthorizedException(UNAUTHORIZED_ACCESS);
    }
  }
}
