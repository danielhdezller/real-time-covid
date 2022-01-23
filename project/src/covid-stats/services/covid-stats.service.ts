import { CovidInformationService } from '@/covid-information/services/covid-information.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CovidStatsService {
  constructor(
    private readonly covidInformationService: CovidInformationService,
  ) {}

  async getByCountryAllStatus({
    country,
    startDate,
    endDate,
  }: {
    country: string;
    startDate: Date;
    endDate: Date;
  }) {
    const response = await this.covidInformationService.getByCountryAllStatus(
      country,
      startDate,
      endDate,
    );
    return response
  }
}
