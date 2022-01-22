import { createConfigurableDynamicRootModule } from "@golevelup/nestjs-modules";
import { Module } from "@nestjs/common";


@Module({})
export class AppConfigModule extends createConfigurableDynamicRootModule<AppConfigModule, ConfigurationProviderOptions>(ConfigurationProviderOptions,
    {
        providers: [],
        exports: [],
    }) {
        static deferred = () => AppConfigModule.externallyConfigured(AppConfigModule, 0);
    }