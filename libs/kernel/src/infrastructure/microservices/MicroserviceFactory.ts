import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

export interface CreateFactoryOptions {
  name: string;
  queue: string;
  host: string;
  port: number;
}

export class MicroserviceFactory {
  static create(appModule: any, options: CreateFactoryOptions) {
    return new MicroserviceFactory(appModule, options);
  }

  private constructor(
    private readonly appModule: any,
    private readonly options: CreateFactoryOptions
  ) {}

  async start() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(this.appModule, {
      transport: Transport.NATS,
      options: {
        servers: [`nats://${this.options.host}:${this.options.port}`],
        queue: this.options.queue
      }
    });
    await app.listen();
    const logger = new Logger('MicroserviceFactory');
    logger.log(
      `🚀🦠🎧 ${this.options.name} microservice is running using transporter at : nats://${this.options.host}:${this.options.port}`
    );
  }
}
