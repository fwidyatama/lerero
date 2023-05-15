import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { IsAfter } from 'src/decorator/date.decorator';

export class UpdateDTO {
  @IsString()
  @IsNotEmpty()
  readonly skill: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  readonly startDate!: Date;

  @IsAfter('startDate')
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  readonly endDate!: Date;

  @IsArray()
  @IsNotEmpty()
  readonly participant: string[];
}
