import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatsTypes } from '../../enums/stats.enum';

export class StatRankingDto {
  @ApiProperty()
  @IsEnum(StatsTypes)
  stats: StatsTypes;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string[];

  @ApiProperty()
  @IsDate()
  startedAt: Date;

  @ApiProperty()
  @IsDate()
  endAt: Date;
}
