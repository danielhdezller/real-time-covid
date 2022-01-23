import { DateRangeDto } from '@/covid-information/Dto/date-range.dto';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PercentageRecoveryDeathPerCountryDto } from '../Dto/percentage-recovery-death.dto';
import { TrendDto } from '../Dto/trend.dto';
import { CovidStatsService } from '../services/covid-stats.service';

@Controller('covid-stats')
@ApiTags('Covid-Stats')
export class CovidStatsController {
  constructor(private covidStatsService: CovidStatsService) {}

  @Get('country/:country')
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

  @Get('last-six-month-trend/country/:country')
  @ApiOkResponse({
    type: TrendDto,
  })
  async lastSixMonthRecoveryTrend(
    @Param('country') country: string,
    @Query() dateRangeDto: DateRangeDto,
  ): Promise<TrendDto> {
    return await this.covidStatsService.lastSixMonthRecoveryTrend({
      country,
    });
  }
}
