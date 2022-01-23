import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString } from 'class-validator';

export class DateRangeDto {
  @ApiProperty()
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @IsDateString()
  endDate: Date;
}
