import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Commands, Domains } from '@slack-clone/kernel';

@Controller()
export class UserController {
  @MessagePattern(Commands[Domains.user].greet)
  async greetInSpanish(data: string): Promise<string> {
    return `Hola from user module ${data}`;
  }
}
