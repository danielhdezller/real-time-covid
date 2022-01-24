import { CovidInformationModule } from '@/covid-information/covid-information.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CovidStatsController } from './controllers/covid-stats.controller';
import { StatsRepository } from './repositories/stats.repository';
import { CovidStatsService } from './services/covid-stats.service';

@Module({
  imports: [
    CovidInformationModule,
    TypeOrmModule.forFeature([StatsRepository]),
  ],
  controllers: [CovidStatsController],
  providers: [CovidStatsService],
  exports: [],
})
export class CovidStatsModule {}
