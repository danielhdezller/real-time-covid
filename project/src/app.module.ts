import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { normalize } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config-provider/app-config.module';
import { AppConfiguration } from './config-provider/configurations/app.configuration';
import { CovidInformationModule } from './covid-information/covid-information.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
