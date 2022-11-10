import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Commands, Domains } from '@slack-clone/kernel';

@Injectable()
export class AppService {
  constructor(
    @Inject('THREAD_SERVICE') private readonly threadClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy
  ) {}

  async getThread() {
    return this.threadClient.send(Commands[Domains.thread].greet, 'maximilien');
  }

  async getUser() {
    return this.userClient.send(Commands[Domains.user].greet, 'boutcha');
  }
}
