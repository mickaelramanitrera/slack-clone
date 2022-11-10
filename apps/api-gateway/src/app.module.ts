import { Module } from '@nestjs/common';

import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { CLIENT_SERVICE } from './app/infrastructure/services/constants';
import { getUsecases } from './app/application/usecases';
import { ThreadService } from './app/application/services/thread.service';
import { ThreadInternalService } from './app/infrastructure/services/threadInternal.service';
import { getControllers } from './app/infrastructure/controllers';
import { UserService } from './app/application/services/user.service';
import { UserInternalService } from './app/infrastructure/services/userInternal.service';
import { RealtimeGateway } from './app/infrastructure/gateway/realtime.gateway';

class BaseModuleFactory {
  static create(imports: any[], providers: any[], controllers: any[]) {
    return {
      imports: [ConfigModule.forRoot({ isGlobal: true, load: [config] }), ...imports],
      providers: [
        {
          provide: CLIENT_SERVICE,
          useFactory: (configService: ConfigService) => {
            return ClientProxyFactory.create({
              transport: Transport.NATS,
              options: {
                servers: [
                  `nats://${configService.get<string>('nats.host')}:${configService.get<number>(
                    'nats.port'
                  )}`
                ]
              }
            });
          },
          inject: [ConfigService]
        },
        ...getUsecases(),
        ...providers
      ],
      controllers: [...getControllers(), ...controllers]
    };
  }
}

@Module(
  BaseModuleFactory.create(
    [],
    [
      {
        provide: ThreadService,
        useClass: ThreadInternalService
      },
      {
        provide: UserService,
        useClass: UserInternalService
      },
      RealtimeGateway
    ],
    []
  )
)
export class AppModule {}
