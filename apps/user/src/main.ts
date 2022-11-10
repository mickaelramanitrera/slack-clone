import { AppModule } from './app.module';
import { Domains, MicroserviceFactory, getResolvedConfig } from '@slack-clone/kernel';
import config from './config';

async function bootstrap() {
  const { host, port } = await getResolvedConfig(config, 'nats');

  const microService = MicroserviceFactory.create(AppModule, {
    host,
    port,
    queue: Domains.user,
    name: Domains.user
  });

  await microService.start();
}

bootstrap();
