import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { response } from 'express';

import { map, Observable } from 'rxjs';
import {
  AllDataDto,
  AllStatusByCountryDto,
} from '../Dto/all-status-by-country.dto';

@Injectable()
export class CovidInformationService {
  constructor(private httpService: HttpService) {}

  /**
   * Obtain the Covid status per country and date range,
   * from the external API
   * @see https://documenter.getpostman.com/view/10808728/SzS8rjbc#071be6ab-ebcc-40dc-be8b-9209ab7caca5
   * @param {{country: string,
   *     startDate: Date,
   *     endDate: Date,}} {country, startDate, endDate}
   * @return {*}  {Observable<[AllStatusByCountryDto]>}
   * @memberof CovidInformationService
   */
  getByCountryAllStatus({
    country,
    startDate,
    endDate,
  }: {
    country: string;
    startDate: Date;
    endDate: Date;
  }): Observable<[AllStatusByCountryDto]> {
    return this.httpService
      .get(
        `https://api.covid19api.com/country/${country}?from=${startDate}&to=${endDate}`,
      )
      .pipe(
        map((response: { data: [AllStatusByCountryDto] }) => response.data),
      );
  }

  /**
   * Obtain the all data Covid
   * from the external API.
   * @see https://documenter.getpostman.com/view/10808728/SzS8rjbc#071be6ab-ebcc-40dc-be8b-9209ab7caca5
   * @return {*}  {Observable<[AllDataDto]>}
   * @memberof CovidInformationService
   */
  getAllData(): Observable<[AllDataDto]> {
    return this.httpService
      .get(`https://api.covid19api.com/all`)
      .pipe(map((response: { data: [AllDataDto] }) => response.data));
  }
}
