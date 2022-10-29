import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class TrendDto {
  @ApiProperty({
    description: 'The trend percentage of the first two values at the range.',
    example: 56465075,
  })
  @IsNumber()
  trendTendency: number;

  @ApiProperty({
    description: 'The fist trend value of the range at the day.',
    example: 56465075,
  })
  @IsDate()
  firstTrendValueFrom: Date;

  @ApiProperty({
    description: 'The fist trend value at the range.',
    example: 56465075,
  })
  @IsNumber()
  firstTrendValue: number;

  @ApiProperty({
    description: 'The las trend value at the range at the day.',
    example: 56465075,
  })
  @IsDate()
  lastTrendValueAt: Date;

  @ApiProperty({
    description: 'The las trend value at the range.',
    example: 56465075,
  })
  @IsNumber()
  lastTrendValue: number;

  @ApiProperty({
    description: 'The target country.',
    example: 56465075,
  })
  @IsString()
  country: string;
}
