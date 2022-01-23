import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { Module } from '@nestjs/common';
import { AppConfiguration } from './configurations/app.configuration';
import { ConfigurationProviderOptions } from './interfaces/app.interfaces';
import { ConfigProviderService } from './services/config-provider.service';

@Module({})
export class AppConfigModule extends createConfigurableDynamicRootModule<
  AppConfigModule,
  ConfigurationProviderOptions
>(ConfigurationProviderOptions, {
  providers: [
    {
      provide: AppConfiguration,
      inject: [ConfigurationProviderOptions],
      useFactory: async (
        configurationProviderOptions: ConfigurationProviderOptions,
      ) => {
        const configProviderService = new ConfigProviderService(
          configurationProviderOptions,
        );
        await configProviderService.init();
        return configProviderService.getAppConfiguration();
      },
    },
  ],
  exports: [AppConfiguration],
}) {
  static deferred = () =>
    AppConfigModule.externallyConfigured(AppConfigModule, 0);
}
