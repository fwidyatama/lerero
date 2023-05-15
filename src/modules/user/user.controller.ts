import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDTO } from './dto/register.dto';
import {
  BOARD,
  CREATE_SUCCESS,
  UNAUTHORIZED_ACCESS,
} from 'src/constant/response.constant';
import { TransformInterceptorWithoutData } from 'src/interceptor/successResponseWithoutData.interceptor';
import { ValidationFilter } from 'src/filter/validation.filter';
import { AuthGuard } from 'src/guard/auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Role } from 'src/decorator/role.decorator';

@Controller('user')
@UseInterceptors(TransformInterceptorWithoutData)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(200)
  @Role(BOARD)
  @UseGuards(AuthGuard, RoleGuard)
  @UseFilters(new ValidationFilter())
  async create(@Body() registerDTO: RegisterDTO) {
    const result = await this.userService.create(registerDTO);
    if (result._id) {
      return { message: CREATE_SUCCESS };
    } else {
      throw new UnauthorizedException(UNAUTHORIZED_ACCESS);
    }
  }
}
