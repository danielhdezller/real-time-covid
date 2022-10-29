import { ApiProperty } from '@nestjs/swagger';

export class PercentageRecoveryDeathPerCountryDto {
  @ApiProperty({
    description:
      'Represent the percentage of recovered people date range by country.',
    example: 43.340702382106485,
  })
  percentageRecovery: number;

  @ApiProperty({
    description:
      'Represent the percentage of death people date range by country.',
    example: 2.9507538520847887,
  })
  percentageDeath: number;

  @ApiProperty({
    description: 'The target country.',
    example: 'South Africa',
  })
  country: string;
}
