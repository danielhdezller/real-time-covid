import { AllStatusByCountryDto } from '@/covid-information/Dto/all-status-by-country.dto';
import { DateRangeDto } from '@/covid-information/Dto/date-range.dto';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PercentageRecoveryDeathPerCountryDto } from '../Dto/percentage-recovery-death.dto';
import { CovidStatsService } from '../services/covid-stats.service';

@Controller('covid-stats')
@ApiTags('Covid-Stats')
export class CovidStatsController {
  constructor(private covidStatsService: CovidStatsService) {}

  @Get(':country')
  @ApiOkResponse({
    type: PercentageRecoveryDeathPerCountryDto,
  })
  async percentagesOfRecoveredDeathPerCountry(
    @Param('country') country: string,
    @Query() dateRangeDto: DateRangeDto,
  ): Promise<PercentageRecoveryDeathPerCountryDto> {
    return await this.covidStatsService.percentagesOfRecoveredDeathPerCountry({
      country,
      startDate: dateRangeDto.startDate,
      endDate: dateRangeDto.startDate,
    });
  }
}
