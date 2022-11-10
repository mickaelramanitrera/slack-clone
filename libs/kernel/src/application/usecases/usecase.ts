import { UsecaseResult } from './usecaseResult';

export abstract class Usecase<T, U> {
  abstract execute(request: T): Promise<UsecaseResult<U>>;
}
