import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CovidStatsService } from "../services/covid-stats.service";

@Controller()
@ApiTags()
export class CovidStatsController {
    constructor( private covidStatsService : CovidStatsService) {}
}