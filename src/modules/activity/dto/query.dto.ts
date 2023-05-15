import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryDTO {
  @IsString()
  readonly order?: string = 'ASC';

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly page?: number = 1;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly limit?: number = 5;
}
