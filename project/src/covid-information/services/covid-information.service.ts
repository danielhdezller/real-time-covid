import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import { map, Observable } from 'rxjs';

@Injectable()
export class CovidInformationService {
  constructor(private httpService: HttpService) {}

    getByCountryAllStatus(
    country: string,
    startDate: Date,
    endDate: Date,
  ): Observable<AxiosResponse> {
    return this.httpService.get(
      `https://api.covid19api.com/country/${country}?from=${startDate}&to=${endDate}`,
      ).pipe( map((response: { data: any; }) => response.data))
  }
}
