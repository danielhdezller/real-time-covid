import { Module } from '@nestjs/common';
import { normalize } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config-provider/app-config.module';

@Module({
  imports: [
    // Configuration provider module
    AppConfigModule.forRootAsync(
        AppConfigModule,
        {
            useFactory: () => {
                return {
                    envPath: normalize(`${__dirname}/../config.json`),
                };
            },
        }
    ),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
