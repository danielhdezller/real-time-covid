import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class DateRangeQueryDto {
  @ApiProperty({
    example: '2022-01-01'
  })
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    example: '2021-01-01'
  })
  @IsDateString()
  endDate: Date;
}
