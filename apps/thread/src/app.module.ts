import { Module } from '@nestjs/common';
import { ThreadController } from './modules/thread/infrastructure/controllers/thread.controller';
import { ConfigModule } from '@nestjs/config';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    })
  ],
  providers: [],
  controllers: [ThreadController]
})
export class AppModule {}
