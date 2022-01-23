import { DateRangeDto } from '@/covid-information/Dto/date-range.dto';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CovidStatsService } from '../services/covid-stats.service';

@Controller('covid-stats')
@ApiTags('Covid-Stats')
export class CovidStatsController {
  constructor(private covidStatsService: CovidStatsService) {}

  @Get(':country')
  getByCountryAllStatus(
    @Param('country') country: string,
    @Query() dateRangeDto: DateRangeDto,
  ) {
    return this.covidStatsService.getByCountryAllStatus({
      country,
      startDate: dateRangeDto.startDate,
      endDate: dateRangeDto.startDate,
    });
  }
}
