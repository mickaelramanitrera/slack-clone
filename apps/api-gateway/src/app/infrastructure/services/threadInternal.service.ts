import { ThreadService } from '../../application/services/thread.service';
import { lastValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { Result, ok, err } from 'neverthrow';
import { CLIENT_SERVICE } from './constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands, Domains } from '@slack-clone/kernel';

@Injectable()
export class ThreadInternalService extends ThreadService {
  constructor(@Inject(CLIENT_SERVICE) private readonly clientService: ClientProxy) {
    super();
  }

  async greet(name: string): Promise<Result<string, any>> {
    try {
      const results = await lastValueFrom(
        this.clientService.send<string>(Commands[Domains.thread].greet, name)
      );

      return ok(results);
    } catch (error) {
      return err(error);
    }
  }
}
