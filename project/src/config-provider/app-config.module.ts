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
  providers: [{
      provide: AppConfiguration,
      inject: [ConfigurationProviderOptions, ],
      useFactory: 
        async (configurationProvider : ConfigurationProviderOptions) => {
            const configProviderService = 
            new ConfigProviderService(configurationProvider);
            await ConfigProviderService.init();
            return configProviderService.getAppConfiguration();
            
        }
  }],
  exports: [],
}) {
  static deferred = () =>
    AppConfigModule.externallyConfigured(AppConfigModule, 0);
}
