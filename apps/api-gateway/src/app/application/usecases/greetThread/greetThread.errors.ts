export class CannotGetResponseError extends Error {
  constructor() {
    super(`Cannot get response from thread service`);
  }
}
