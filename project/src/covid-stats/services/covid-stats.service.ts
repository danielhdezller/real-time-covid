import { AllStatusByCountryDto } from '@/covid-information/Dto/all-status-by-country.dto';
import { CovidInformationService } from '@/covid-information/services/covid-information.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { PercentageRecoveryDeathPerCountryDto } from '../Dto/percentage-recovery-death.dto';
import { TrendDto } from '../Dto/trend.dto';

@Injectable()
export class CovidStatsService {
  constructor(
    private readonly covidInformationService: CovidInformationService,
  ) {}

  /**
   * Calculate the percentages of death and recovery of people by covid, per sample data.
   * @param {[AllStatusByCountryDto]} allStatusByCountry The Sample data per country and date range.
   * @return {*}  {PercentageRecoveryDeathPerCountryDto}
   * @memberof CovidStatsService
   */
  calculatePercentagesOfRecoveredDeathPerCountry(
    allStatusByCountry: [AllStatusByCountryDto],
  ): PercentageRecoveryDeathPerCountryDto {
    const percentageRecoveryDeathPerCountryDto =
      new PercentageRecoveryDeathPerCountryDto();

    let totalDeath: number = 0,
      totalRecovered: number = 0,
      totalConfirmed: number = 0;

    allStatusByCountry.forEach(function (a) {
      totalDeath += a.Deaths;
    });
    allStatusByCountry.forEach(function (a) {
      totalRecovered += a.Recovered;
    });
    allStatusByCountry.forEach(function (a) {
      totalConfirmed += a.Confirmed;
    });

    percentageRecoveryDeathPerCountryDto.percentageRecovery =
      (totalRecovered / totalConfirmed) * 100;
    percentageRecoveryDeathPerCountryDto.percentageDeath =
      (totalDeath / totalConfirmed) * 100;
    percentageRecoveryDeathPerCountryDto.country =
      allStatusByCountry[0].Country;

    return percentageRecoveryDeathPerCountryDto;
  }

  /**
   * Obtain the sample data from the covid information module to calculate the percentage
   * of recovered and death people by covid, for an specific country and date range.
   * @param {{
   *     country: string;
   *     startDate: Date;
   *     endDate: Date;
   *   }} {
   *     country, The Target country.
   *     startDate, The start date range.
   *     endDate, The end date range.
   *   }
   * @return {*}  {Promise<PercentageRecoveryDeathPerCountryDto>}
   * @memberof CovidStatsService
   */
  async percentagesOfRecoveredDeathPerCountry({
    country,
    startDate,
    endDate,
  }: {
    country: string;
    startDate: Date;
    endDate: Date;
  }): Promise<PercentageRecoveryDeathPerCountryDto> {
    const allStatusByCountry: [AllStatusByCountryDto] = await lastValueFrom(
      this.covidInformationService.getByCountryAllStatus({
        country,
        startDate,
        endDate,
      }),
    );
    if (!allStatusByCountry)
      throw new HttpException(
        'Covid Data not found.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return this.calculatePercentagesOfRecoveredDeathPerCountry(
      allStatusByCountry,
    );
  }

  /**
   * Calculate the recovery tendency for a given range date, taking the first value and lhe last value different to 0 .
   * @param {AllStatusByCountryDto[]} allStatusByCountry The range data.
   * @return {*}  {TrendDto}
   * @memberof CovidStatsService
   */
  calculateLastSixMonthTrend(
    allStatusByCountry: AllStatusByCountryDto[],
  ): TrendDto {
    const trendDto = new TrendDto();

    const ordered = allStatusByCountry.sort(function (a, b) {
      return new Date(b.Date).getTime() + new Date(a.Date).getTime();
    });

    let length = ordered.length,
      firstDay: number = 0,
      lastDay: number = 0,
      i = 0;

    //Find the first day with recovered value in the range.
    do {
      i = i + 1;
      firstDay = ordered[i].Recovered;
      trendDto.firstTrendValue = ordered[i].Recovered;
      trendDto.firstTrendValueFrom = ordered[i].Date;
    } while (ordered[i].Recovered === 0);

    //Find the last day with recovered value in the range.
    do {
      length = length - 1;
      lastDay = ordered[length].Recovered;
      trendDto.lastTrendValue = ordered[length].Recovered;
      trendDto.lastTrendValueAt = ordered[length].Date;
    } while (ordered[length].Recovered === 0);

    trendDto.trendTendency = (lastDay / firstDay) * 100;
    trendDto.country = allStatusByCountry[0].Country;

    return trendDto;
  }

  async lastSixMonthRecoveryTrend({
    country,
  }: {
    country: string;
  }): Promise<TrendDto> {
    const averageDaysPerMonth = 30;
    const month = 6;
    const endDate = new Date();
    const startDate = new Date(endDate.getDate() - averageDaysPerMonth * month);

    const allStatusByCountry: [AllStatusByCountryDto] = await lastValueFrom(
      this.covidInformationService.getByCountryAllStatus({
        country,
        startDate,
        endDate,
      }),
    );
    if (!allStatusByCountry)
      throw new HttpException(
        'Covid Data not found.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return this.calculateLastSixMonthTrend(allStatusByCountry);
  }
}
