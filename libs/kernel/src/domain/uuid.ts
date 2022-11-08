import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class Uuid {
  private readonly id: string;

  constructor(id?: string) {
    if (!id) {
      this.id = uuidv4();
      return;
    }

    if (!uuidValidate(id)) {
      throw new Error(`ID ${id} is not a valid uuid`);
    }

    this.id = id;
  }

  public toString(): string {
    return this.id;
  }
}
