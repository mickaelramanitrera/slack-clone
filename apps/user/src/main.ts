import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const host = process.env.USER_HOST || 'localhost';
  const port = Number(process.env.USER_PORT) || 8081;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host,
      port,
      retryAttempts: 5,
      retryDelay: 1000
    }
  });
  await app.listen();
  Logger.log(`🚀 Microservice is running on: http://${host}:${port}`);
}

bootstrap();
