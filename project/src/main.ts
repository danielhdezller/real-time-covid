import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfiguration } from '@/config-provider/configurations/app.configuration';
import { EnvironmentModes } from '@/config-provider/interfaces/app.interfaces';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Extract the configProvider and the logger from the created app
  const appConfiguration = app.select(AppModule).get(AppConfiguration);

  if (appConfiguration.isMode(EnvironmentModes.Development)) {
    await bootstrapSwagger(app);
  }

  await app.listen(appConfiguration.appPort);
}

function bootstrapSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Real-Time-Covid')
    .setDescription('Real-Time-Covid API')
    .setVersion('1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('teal-time-covid-swagger', app, document);
}

bootstrap();
