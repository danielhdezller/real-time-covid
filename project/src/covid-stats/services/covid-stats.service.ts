import { CovidInformationService } from "@/covid-information/services/covid-information.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CovidStatsService{
    constructor(
        private readonly covidInformationService : CovidInformationService,
    ) {}
}