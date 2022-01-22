import { createConfigurableDynamicRootModule } from "@golevelup/nestjs-modules";
import { Module } from "@nestjs/common";
import { ConfigurationProviderOptions } from "./interfaces/app.interfaces";


@Module({})
export class AppConfigModule extends createConfigurableDynamicRootModule<AppConfigModule, ConfigurationProviderOptions>(ConfigurationProviderOptions,
    {
        providers: [],
        exports: [],
    }) {
        static deferred = () => AppConfigModule.externallyConfigured(AppConfigModule, 0);
    }