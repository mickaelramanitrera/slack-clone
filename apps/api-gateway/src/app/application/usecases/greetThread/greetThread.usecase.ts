import { Injectable } from '@nestjs/common';
import { Usecase, UsecaseResult } from '@slack-clone/kernel';
import { GreetThreadDto } from './greetThread.dto';
import { GreetThreadResponse } from './greetThread.response';
import { ThreadService } from '../../services/thread.service';
import { CannotGetResponseError } from './greetThread.errors';

@Injectable()
export class GreetThreadUsecase extends Usecase<GreetThreadDto, GreetThreadResponse> {
  constructor(private readonly threadService: ThreadService) {
    super();
  }

  async execute(request: GreetThreadDto): Promise<UsecaseResult<GreetThreadResponse>> {
    const greetResult = await this.threadService.greet(request.name);
    return greetResult
      .map((response) => ({
        response
      }))
      .mapErr((_) => new CannotGetResponseError());
  }
}
