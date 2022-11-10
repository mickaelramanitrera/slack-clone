import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'THREAD_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
          queue: 'thread'
        }
      }
    ]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
          queue: 'user'
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
