import { AppModule } from './app.module';
import { Domains, MicroserviceFactory, getResolvedConfig } from '@slack-clone/kernel';
import config from './config';

async function bootstrap() {
  const { host, port } = await getResolvedConfig(config, 'nats');

  const microService = MicroserviceFactory.create(AppModule, {
    host,
    port,
    queue: Domains.thread,
    name: Domains.thread
  });

  await microService.start();
}

bootstrap();
