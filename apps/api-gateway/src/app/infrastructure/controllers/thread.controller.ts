import { Controller, Get } from '@nestjs/common';

import { GreetThreadUsecase } from '../../application/usecases/greetThread/greetThread.usecase';

@Controller()
export class ThreadController {
  constructor(private readonly greetThreadUsecase: GreetThreadUsecase) {}

  @Get('thread')
  async getThread() {
    const usecaseResult = await this.greetThreadUsecase.execute({ name: 'babacool' });
    if (usecaseResult.isErr()) {
      throw new Error(usecaseResult.error);
    }

    return usecaseResult.value;
  }
}
