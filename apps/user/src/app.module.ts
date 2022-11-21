import { Module } from '@nestjs/common';
import { UserController } from './modules/user/infrastructure/controllers/user.controller';
import { getUsecases } from './modules/user/application/usecases';

@Module({
  imports: [],
  providers: [...getUsecases()],
  controllers: [UserController]
})
export class AppModule {}
