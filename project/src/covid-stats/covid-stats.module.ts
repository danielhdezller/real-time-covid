import { CovidInformationModule } from '@/covid-information/covid-information.module';
import { Module } from '@nestjs/common';
import { CovidStatsController } from './controllers/covid-stats.controller';
import { CovidStatsService } from './services/covid-stats.service';

@Module({
  imports: [CovidInformationModule],
  controllers: [CovidStatsController],
  providers: [CovidStatsService],
  exports: [],
})
export class CovidStatsModule {}
