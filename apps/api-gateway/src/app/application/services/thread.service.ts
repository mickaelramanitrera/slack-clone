import { Result } from 'neverthrow';

export abstract class ThreadService {
  abstract greet(name: string): Promise<Result<string, any>>;
}
