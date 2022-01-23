import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class CovidInformationService {
  constructor(private httpService: HttpService) {}

  async getByCountryAllStatus(
    country: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Observable<AxiosResponse>> {
    return this.httpService.get(
      `https://api.covid19api.com/country/${country}?from=${startDate}&to=${endDate}`,
    );
  }
}
