import { AllStatusByCountryDto } from '@/covid-information/Dto/all-status-by-country.dto';
import { CovidInformationService } from '@/covid-information/services/covid-information.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { PercentageRecoveryDeathPerCountryDto } from '../Dto/percentage-recovery-death.dto';

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
      totalActive: number = 0,
      totalRecovered: number = 0,
      totalConfirmed: number = 0;

    allStatusByCountry.forEach(function (a) {
      totalDeath += a.Deaths;
    });
    allStatusByCountry.forEach(function (a) {
      totalActive += a.Active;
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
      this.covidInformationService.getByCountryAllStatus(
        country,
        startDate,
        endDate,
      ),
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
}
