import { promises } from 'fs';
import { normalize } from 'path';
import { ConfigProviderService } from '@/config-provider/services/config-provider.service';

(async () => {
  const configProviderService = new ConfigProviderService({
    envPath: normalize(`${__dirname}/../../config.json`),
  });

  await configProviderService.init();
  const configuration = configProviderService.getAppConfiguration();
  const typeOrmConfig = configuration.getTypeOrmConfig();

  const ormConfig = {
    ...typeOrmConfig,
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['./src/database/migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: './src/database/migrations',
    },
  };

  const ormConfigPath = normalize(__dirname + '../../../ormconfig.json');
  const typeOrmFileData = new Uint8Array(
    Buffer.from(JSON.stringify(ormConfig, null, 4)),
  );
  console.log(ormConfigPath);
  await promises.writeFile(ormConfigPath, typeOrmFileData);
})();
