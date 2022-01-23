import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { normalize } from 'path';
import { AppConfigModule } from './config-provider/app-config.module';
import { AppConfiguration } from './config-provider/configurations/app.configuration';
import { CovidInformationModule } from './covid-information/covid-information.module';
import { CovidStatsModule } from './covid-stats/covid-stats.module';

@Module({
  imports: [
    // Typeorm App Configuration
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule.deferred()],
      inject: [AppConfiguration],
      useFactory: async (appConfiguration: AppConfiguration) => {
        return appConfiguration.getTypeOrmConfig();
      },
    }),
    // Configuration provider module
    AppConfigModule.forRootAsync(AppConfigModule, {
      useFactory: () => {
        return {
          envPath: normalize(`${__dirname}/../config.json`),
        };
      },
    }),
    CovidInformationModule,
    CovidStatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
