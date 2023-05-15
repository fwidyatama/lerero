import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UnauthorizedException,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CREATE_SUCCESS,
  EXPERT,
  UNAUTHORIZED_ACCESS,
  UPDATE_SUCCESS,
} from 'src/constant/response.constant';
import { TransformInterceptorWithoutData } from 'src/interceptor/successResponseWithoutData.interceptor';
import { ValidationFilter } from 'src/filter/validation.filter';
import { AuthGuard } from 'src/guard/auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Role } from 'src/decorator/role.decorator';
import { ActivityService } from './activity.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { TransformInterceptorWithData } from 'src/interceptor/successReponseWithData.interceptor';
import { QueryDTO } from './dto/query.dto';
import { UnauthorizedFilter } from 'src/filter/unauthorized.filter';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @UseInterceptors(TransformInterceptorWithoutData)
  @Post()
  @HttpCode(200)
  @Role(EXPERT)
  @UseGuards(AuthGuard, RoleGuard)
  @UseFilters(new ValidationFilter())
  async create(@Body() createDTO: CreateDTO) {
    const result = await this.activityService.create(createDTO);
    if (result._id) {
      return { message: CREATE_SUCCESS };
    } else {
      throw new UnauthorizedException(UNAUTHORIZED_ACCESS);
    }
  }

  @UseInterceptors(TransformInterceptorWithoutData)
  @Put(':id')
  @HttpCode(200)
  @Role(EXPERT)
  @UseGuards(AuthGuard, RoleGuard)
  @UseFilters(new ValidationFilter())
  async update(@Body() updateDTO: UpdateDTO, @Param('id') activityId: string) {
    await this.activityService.update(activityId, updateDTO);
    return { message: UPDATE_SUCCESS };
  }

  @UseInterceptors(TransformInterceptorWithData)
  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UseFilters(new UnauthorizedFilter())
  async getAll(@Param('id') skillID: string, @Query() queryDto: QueryDTO) {
    const result = await this.activityService.findAll(skillID, queryDto);
    return { result };
  }

  @UseInterceptors(TransformInterceptorWithoutData)
  @Delete(':id')
  @HttpCode(200)
  @HttpCode(422)
  @Role(EXPERT)
  @UseGuards(AuthGuard, RoleGuard)
  @UseFilters(new UnauthorizedFilter())
  async delete(@Param('id') activityID: string) {
    const result = await this.activityService.delete(activityID);
    if (result) {
      return { message: UPDATE_SUCCESS };
    } else {
      throw new UnauthorizedException(UNAUTHORIZED_ACCESS);
    }
  }
}
