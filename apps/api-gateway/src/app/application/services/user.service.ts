import { Result } from 'neverthrow';

export abstract class UserService {
  abstract greet(name: string): Promise<Result<string, any>>;
}
