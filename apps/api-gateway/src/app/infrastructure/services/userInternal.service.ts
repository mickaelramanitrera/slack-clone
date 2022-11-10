import { UserService } from '../../application/services/user.service';
import { err, ok, Result } from 'neverthrow';
import { Inject, Injectable } from '@nestjs/common';
import { CLIENT_SERVICE } from './constants';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Commands, Domains } from '@slack-clone/kernel';

@Injectable()
export class UserInternalService extends UserService {
  constructor(@Inject(CLIENT_SERVICE) private readonly clientService: ClientProxy) {
    super();
  }

  async greet(name: string): Promise<Result<string, any>> {
    try {
      const results = await lastValueFrom(
        this.clientService.send<string>(Commands[Domains.user].greet, name)
      );

      return ok(results);
    } catch (e) {
      return err(e);
    }
  }
}
