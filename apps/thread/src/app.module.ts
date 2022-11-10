import { Module } from '@nestjs/common';
import { ThreadController } from './modules/thread/infrastructure/controllers/thread.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [ThreadController]
})
export class AppModule {}
