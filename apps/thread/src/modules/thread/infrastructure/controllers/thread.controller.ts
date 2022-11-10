import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Commands, Domains } from '@slack-clone/kernel';

@Controller()
export class ThreadController {
  private readonly logger: Logger = new Logger(ThreadController.name);

  @MessagePattern(Commands[Domains.thread].greet)
  async greet(data: string): Promise<string> {
    this.logger.log('Called Thread service');
    return `Hello from thread module ${data}`;
  }
}
