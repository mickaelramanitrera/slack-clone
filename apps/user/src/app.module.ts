import { Module } from '@nestjs/common';
import { UserController } from './modules/user/infrastructure/controllers/user.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [UserController]
})
export class AppModule {}
