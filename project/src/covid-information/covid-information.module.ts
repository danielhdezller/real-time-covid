import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CovidInformationService } from './services/covid-information.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [CovidInformationService],
  exports: [CovidInformationService],
})
export class CovidInformationModule {}
