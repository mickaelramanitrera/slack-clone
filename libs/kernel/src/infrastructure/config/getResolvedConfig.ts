import { NestFactory } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Only to be used outside of a module for example at the creation of the module
// where there is no nest app context to work with
export const getResolvedConfig = async (config: any, valuePath: string) => {
  const appContext = await NestFactory.createApplicationContext(
    ConfigModule.forRoot({
      load: [config]
    })
  );
  const configService = appContext.get(ConfigService);
  const configResults = configService.get(valuePath);
  await appContext.close();

  return configResults;
};
