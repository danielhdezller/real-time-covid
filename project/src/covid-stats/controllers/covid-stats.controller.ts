import { DateRangeDto } from '@/covid-information/Dto/date-range.dto';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as moment from 'moment';
import { PercentageRecoveryDeathPerCountryDto } from '../Dto/percentage-recovery-death.dto';
import { StatRankingDto } from '../Dto/stats-ranking.dto';
import { TrendDto } from '../Dto/trend.dto';
import { StatsTypes } from '../enums/stats.enum';
import { CovidStatsService } from '../services/covid-stats.service';

@Controller('covid-stats')
@ApiTags('Covid-Stats')
export class CovidStatsController {
  constructor(private covidStatsService: CovidStatsService) {}

  @Get('countries/:country/percentages')
  @ApiOperation({
    description:
      'It return the percentage of death and recovered by range date.',
  })
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
      endDate: dateRangeDto.endDate,
    });
  }

  @Get('countries/:country/trend/recovered/summary')
  @ApiOperation({
    description: 'It take the recovered trend of the last six month.',
  })
  @ApiOkResponse({
    type: TrendDto,
  })
  async lastSixMonthRecoveryTrend(
    @Param('country') country: string,
  ): Promise<TrendDto> {
    const toMonth = 6;
    const endDate = new Date();
    const startDate = moment(endDate).subtract(toMonth, 'months').toDate();

    return await this.covidStatsService.lastSixMonthRecoveryTrend({
      country,
      startDate,
      endDate,
    });
  }

  @Get('/stats/:stats/ranking')
  @ApiOperation({
    description:
      'Deprecated due to the all data endpoint of th the Covid Open API is not working. It should take the top ten countries per covid stat',
    deprecated: true,
  })
  @ApiOkResponse({
    type: StatRankingDto,
  })
  async statsRanking(
    @Param('stats') stats: StatsTypes,
    @Query() dateRangeDto: DateRangeDto,
  ): Promise<StatRankingDto> {
    return await this.covidStatsService.statsRanking({
      stats,
      dateRangeDto,
    });
  }
}
