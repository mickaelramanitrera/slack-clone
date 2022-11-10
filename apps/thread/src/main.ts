import { AppModule } from './app.module';
import { Domains, MicroserviceFactory } from '@slack-clone/kernel';

const host = process.env.THREAD_HOST || 'localhost';
const port = Number(process.env.NATS_PORT) || 4222;

const microService = MicroserviceFactory.create(AppModule, {
  host,
  port,
  queue: Domains.thread,
  name: Domains.thread
});

microService.start();
