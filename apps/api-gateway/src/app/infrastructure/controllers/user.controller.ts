import { Controller, Get } from '@nestjs/common';
import { GreetUserUsecase } from '../../application/usecases/greetUser/greetUser.usecase';

@Controller()
export class UserController {
  constructor(private readonly greetUserUsecase: GreetUserUsecase) {}

  @Get('user')
  async getThread() {
    const usecaseResult = await this.greetUserUsecase.execute({ name: 'babacool' });
    if (usecaseResult.isErr()) {
      throw new Error(usecaseResult.error);
    }

    return usecaseResult.value;
  }
}
