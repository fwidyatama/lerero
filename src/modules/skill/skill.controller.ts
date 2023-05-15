import {
  Controller,
  Get,
  HttpCode,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { SkillService } from './skill.service';
import { UnauthorizedFilter } from 'src/filter/unauthorized.filter';
import { TransformInterceptorWithData } from 'src/interceptor/successReponseWithData.interceptor';

@Controller('skills')
@UseInterceptors(TransformInterceptorWithData)
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @UseInterceptors(TransformInterceptorWithData)
  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UseFilters(new UnauthorizedFilter())
  async getAll() {
    const result = await this.skillService.findAll();
    return { result };
  }
}
